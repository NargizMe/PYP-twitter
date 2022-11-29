import { format } from "date-fns";
import { BiComment } from "react-icons/bi";
import { AiOutlineRetweet } from "react-icons/ai";
import { RiSendPlaneLine } from "react-icons/ri";
import Comments from "../comment/Comments";
import postScss from './post.module.scss';
import { PATH_TO_USER_IMAGE } from "../../utils/constants";
import { useUserState } from "../../state/user.state";
import { useCallback, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import commentService from "../../services/comment.service";
import { IComment, IPost } from "../../types/common.type";
import LikeButton from "../like-button/LikeButton";

interface Props {
  item: IPost;
}

export default function Post({ item }: Props) {
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<IComment[]>([]);
  const userStore = useUserState();

  const likeCountRef = useRef<HTMLLIElement | null>(null)

  function handleDateFormat(date: string) {
    const newDate = new Date(date);
    let result = format(newDate, "dd MMMM") + " at " + format(newDate, "HH:mm");
    return result;
  }

  function onReTweetPost(){
    if(!userStore.user.id){
      window.location.href = "/login-sign-up";
      return;
    }
    else{

    }
  }

  const onSaveDone = useCallback((status: boolean) => {
    const likeCount = likeCountRef.current?.innerText.split(" ")[0] as string;
    likeCountRef.current!.innerText = `${status? +likeCount+1: +likeCount-1} Like`
  },[])

  async function handleSendPost(post_id:string, user_id:string){
    if(!userStore.user.id){
      window.location.href = "/login-sign-up";
      return;
    }
    else{
      const payLoad = {
        comment,
        comment_id: uuidv4(),
        user_id,
        post_id,
      };

      const post = await commentService.saveCommentToDB(payLoad);

      if(post.status === 'success'){
        setComments((prev: any) => [
          {
            ...payLoad,
            created_at: new Date(),
            users: {
              name: userStore.user.name,
              image: userStore.user.image
            }
          },
          ...prev
        ]);
        setComment('');
        setShowComments(true);
        // scrollDetect();
      }
    }
  }

  return (
    <section className={postScss.postMain}>
        <div className={postScss.postProfileImgContainer}>
          {
            item.users?.image ?
              <img className={postScss.postProfileImg} alt="profile image"
                   src={`${PATH_TO_USER_IMAGE}/${item.users.image}`} />
              :
              <div className={postScss.defaultImg}>
                <p className={postScss.postParagraph}>{item.users.name?.slice(0, 1).toLocaleUpperCase()}</p>
              </div>
          }
          <div className={postScss.postProfileInfo}>
            <h3>{item.users.name}</h3>
            <span>{handleDateFormat(item.created_at)}</span>
          </div>
        </div>
        <p className={postScss.postParagraph}>{item.tweet}</p>
        {
          item.image ?
            <div className={postScss.postImg}>
              <img alt="Posts Image" src={`${PATH_TO_USER_IMAGE}/${item.image}`} />
            </div>
            : null
        }
        <ul className={postScss.postInfo}>
          <li>{item.number_of_comments[0].count} Comments</li>
          <li>{item.retweet_count} Retweet</li>
          <li ref={likeCountRef}>{item.number_of_likes[0].count} Like</li>
        </ul>
        <div className={postScss.postIconContainer}>
          <button onClick={() => setShowComments(!showComments)}>
            <BiComment />
            <span>Comment</span>
          </button>
          <button onClick={() => onReTweetPost()}>
            <AiOutlineRetweet />
            <span>Retweet</span>
          </button>
          <LikeButton
            likeCount={item.number_of_likes[0].count}
            postId={item.post_id}
            isLiked={userStore.user.id ? item.liked.some(l => l.user_id === userStore.user.id) : false}
            onSaveDone={onSaveDone} />
        </div>
        <div className={postScss.postProfileImgContainer}>
          {
            userStore.user.image ?
              <img className={postScss.postProfileImg} alt="profile image"
                   src={`${PATH_TO_USER_IMAGE}/${userStore.user.image}`} />
              :
              <div className={postScss.defaultImg}>
                <p className={postScss.postParagraph}>{userStore.user.name?.slice(0, 1).toLocaleUpperCase()}</p>
              </div>
          }
          <label>
            <textarea placeholder="Tweet your reply" value={comment} onChange={(e) => setComment(e.target.value)} />
            <button onClick={() => handleSendPost(item.post_id, userStore.user.id!)}>
              <RiSendPlaneLine />
            </button>
          </label>
        </div>
        <div className={postScss.line} />
      {
        showComments?
          <Comments item={item} showComments={showComments} comments={comments}/>
        : null
      }
  </section>
  )
}