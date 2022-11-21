import { format } from "date-fns";
import img from "../../assets/images/me.jpg";
import { BiComment } from "react-icons/bi";
import { AiOutlineRetweet } from "react-icons/ai";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { VscSave } from "react-icons/vsc";
import { RiSendPlaneLine } from "react-icons/ri";
import Comment from "../comment/Comment";
import postScss from './post.module.scss';
import { PATH_TO_USER_IMAGE } from "../../utils/constants";
import { useUserState } from "../../state/user.state";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import postService from "../../services/post.service";
import commentService from "../../services/comment.service";
import { IComment, IPost } from "../../types/common.type";

interface Props {
  data: IPost;
}

export default function Post({ data }: Props) {
  const [like, setLike] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const userStore = useUserState();

  useEffect(() => {
    (async() => {
      let commentsData = await commentService.getComments();
      if(commentsData.status === 'success'){
        setComments(commentsData.data)
      }
    })()
  }, [])

  function handleDateFormat(date: string) {
    const newDate = new Date(date);
    let result = format(newDate, "dd MMMM") + " at " + format(newDate, "HH:mm");
    return result;
  }

  async function handleSendPost(post_id:string, user_id:string){
    const payLoad = {
      comment,
      comment_id: uuidv4(),
      user_id,
      post_id,
    };

    const post = await commentService.saveCommentToDB(payLoad);

    if(post.status === 'success'){
      let commentsData = await commentService.getComments();
      if(commentsData.status === 'success'){
        setComments(commentsData.data);
        setComment('');
      }
    }
  }

  return (
    data.map((item: IPost, i: number) => {
      return (
        <section className={postScss.postMain} key={i}>
          <div className={postScss.postProfileImgContainer}>
            {
              item.users?.image?
                <img className={postScss.postProfileImg} alt="profile image" src={`${PATH_TO_USER_IMAGE}/${item.users.image}`} />
              :
                <div className={postScss.defaultImg}>
                  <p>{item.users.name?.slice(0, 1).toLocaleUpperCase()}</p>
                </div>
            }
            <div className={postScss.postProfileInfo}>
              <h3>{item.users.name}</h3>
              <span>{handleDateFormat(item.created_at)}</span>
            </div>
          </div>
          <p>{item.tweet}</p>
          {
            item.image?
              <div className={postScss.postImg}>
                <img alt="Post Image"  src={`${PATH_TO_USER_IMAGE}/${item.image}`} />
              </div>
            :null
          }
          <ul className={postScss.postInfo}>
            <li>{item.comment_count} Comments</li>
            <li>{item.retweet_count} Retweet</li>
            <li>{item.save_count} Saved</li>
          </ul>
          <div className={postScss.postIconContainer}>
            <button>
              <BiComment />
              <span>Comment</span>
            </button>
            <button>
              <AiOutlineRetweet />
              <span>Retweet</span>
            </button>
            <button onClick={() => setLike(!like)}>
              {
                like? <BsHeartFill/> : <BsHeart />
              }
              <span>Like</span>
            </button>
            <button>
              <VscSave />
              <span>Save</span>
            </button>
          </div>
          <div className={postScss.postProfileImgContainer}>
            {
              userStore.user.image?
                <img className={postScss.postProfileImg} alt="profile image" src={`${PATH_TO_USER_IMAGE}/${userStore.user.image}`} />
              :
                <div className={postScss.defaultImg}>
                  <p>{userStore.user.name?.slice(0, 1).toLocaleUpperCase()}</p>
                </div>
            }
            <label>
              <textarea placeholder="Tweet your reply" value={comment} onChange={(e) => setComment(e.target.value)}/>
              <button onClick={() => handleSendPost(item.post_id, userStore.user.id!)}>
                <RiSendPlaneLine />
              </button>
            </label>
          </div>
          <div className={postScss.line} />
          <div className={postScss.scrollableDiv}>
            <div className={postScss.scrollableContent}>
              {
                comments && comments.map((comment:IComment ) => {
                  return(
                    comment.post_id === item.post_id ?
                      <Comment data={comment} />
                      : null
                  )
                })
              }
            </div>
          </div>
        </section>
      );
    })
  );
}