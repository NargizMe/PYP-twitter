import postScss from "../posts/post.module.scss";
import { IComment, IPost } from "../../types/common.type";
import Comment from "./Comment";
import CommentSkeleton from "../posts/CommentSkeleton";
import { useEffect, useRef, useState } from "react";
import commentService from "../../services/comment.service";

interface Props{
  item: IPost;
  showComments: boolean;
  comments: IComment[];
}

export default function Comments({ item, showComments, comments }: Props){
  const [lazyComments, setLazyComments] = useState<IComment[]>([]);
  const [showSkeleton, setShowSkeleton] = useState(true);

  const hiddenLineRef = useRef<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    (async() => {
      if (item.comments.length > 2 && showComments) {
        let options = {
          root: null,
          rootMargin: '0px',
          threshold: 1.0
        }

        const request = await observerFn();

        observer.current = new IntersectionObserver(request, options);
        observer.current.observe(hiddenLineRef.current!)
      }
      else{
        observer.current?.disconnect();
      }
    })()

    return () => {
      if(observer.current){
        observer.current?.disconnect();
      }
    }
  }, [showComments])

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

  return(
    <div
      className={postScss.scrollableDiv}
      style={
        [...comments, ...item.comments].length>2? {height: '350px'}:
          [...comments, ...item.comments].length===1? {height: '150px'}:
            [...comments, ...item.comments].length===2? {height: '281px'}:
              {height: '0'}
      }
    >
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
  )
}