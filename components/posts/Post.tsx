import { format } from "date-fns";
import { BiComment } from "react-icons/bi";
import { AiOutlineRetweet } from "react-icons/ai";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { VscSave } from "react-icons/vsc";
import { RiSendPlaneLine } from "react-icons/ri";
import Comment from "../comment/Comment";
import postScss from './post.module.scss';
import { PATH_TO_USER_IMAGE } from "../../utils/constants";
import { useUserState } from "../../state/user.state";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import commentService from "../../services/comment.service";
import { IComment, IPost } from "../../types/common.type";
import CommentSkeleton from "./CommentSkeleton";

interface Props {
  item: IPost;
}

export default function Post({ item }: Props) {
  const [like, setLike] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<IComment[]>([]);
  const [lazyComments, setLazyComments] = useState<IComment[]>([]);
  const userStore = useUserState();

  const hiddenLineRef = useRef<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  function handleDateFormat(date: string) {
    const newDate = new Date(date);
    let result = format(newDate, "dd MMMM") + " at " + format(newDate, "HH:mm");
    return result;
  }

  async function scrollDetect(){
    console.log('aaa');
    if (item.comments.length > 2) {
    console.log('bbb');
      let options = {
        root: null,
        rootMargin: '0px',
        threshold: 1.0
      }

      const request = await observerFn();

      observer.current = new IntersectionObserver(request, options);
      observer.current.observe(hiddenLineRef.current!)
    }
  }

  async function observerFn() {

    let from = 3, to = 5;
    return async function(entries: any){
      if(entries[0].isIntersecting){
        let data = await commentService.getCommentsByPostId(from, to, item.post_id);

        if(data.status === 'success'){
          const payload = data.data!;

          if(data.data?.length){
            setLazyComments((prev: IComment[]) => [...prev, ...payload])
          }
          else{
            observer.current!.disconnect();
          }
        }

        if(data.data?.length === 0){
          setShowSkeleton(false);
          observer.current!.disconnect();
        }

        from+=3;
        to+=3;
      }
    }
  }

  function onLikePost(){
    if(!userStore.user.id){
      window.location.href = "/login-sign-up";
      return;
    }
    else{
      setLike(!like);
    }
  }

  function onSavePost(){
    if(!userStore.user.id){
      window.location.href = "/login-sign-up";
      return;
    }
    else{
      // setLike(!like);
    }
  }

  function onReTweetPost(){
    if(!userStore.user.id){
      window.location.href = "/login-sign-up";
      return;
    }
    else{
      // setLike(!like);
    }
  }

  function onShowComments(){
    setShowComments(!showComments);
    scrollDetect();
  }

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
        setComments((prev: any) => prev.concat({
          ...payLoad,
          created_at: new Date(),
          users: {
            name: userStore.user.name,
            image: userStore.user.image
          }
        }));
        setComment('');
        setShowComments(true);
        scrollDetect();
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
          <li>{item.comment_count} Comments</li>
          <li>{item.retweet_count} Retweet</li>
          <li>{item.save_count} Saved</li>
        </ul>
        <div className={postScss.postIconContainer}>
          <button onClick={onShowComments}>
            <BiComment />
            <span>Comment</span>
          </button>
          <button onClick={() => onReTweetPost()}>
            <AiOutlineRetweet />
            <span>Retweet</span>
          </button>
          <button onClick={() => onLikePost()}>
            {
              like ? <BsHeartFill /> : <BsHeart />
            }
            <span>Like</span>
          </button>
          <button onClick={() => onSavePost()}>
            <VscSave />
            <span>Save</span>
          </button>
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
          <div className={postScss.scrollableDiv}>
            <div className={postScss.scrollableContent}>
              {
                comments.map((comment: IComment) => {
                  return (
                    comment.post_id === item.post_id ?
                      <Comment data={comment} key={comment.comment_id} />
                      : null
                  );
                })
              }
              {
                item.comments.map((comment: IComment) => {
                  return (
                    comment.post_id === item.post_id ?
                      <Comment data={comment} key={comment.comment_id} />
                      : null
                  );
                })
              }
              {
                lazyComments.map((comment: IComment) => {
                  return (
                    comment.post_id === item.post_id ?
                      <Comment data={comment} key={comment.comment_id} />
                      : null
                  );
                })
              }
              {
                item.comments.length > 2 && showSkeleton ?
                  <div ref={hiddenLineRef}>
                    <CommentSkeleton/>
                  </div>
                  : null
              }
            </div>
          </div>
        : null
      }

  </section>
  )
}