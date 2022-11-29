import { IPost } from "../../types/common.type";
import Post from "./Post";
import { useEffect, useRef, useState } from "react";
import postService from "../../services/post.service";
import { usePostState } from "../../state/post.state";
import PostSkeleton from './PostSkeleton'
import { useUserState } from "../../state/user.state";

interface Props {
  data: IPost[];
}

export default function Posts({ data }: Props) {
  const [showSkeleton, setShowSkeleton] = useState(true);
  const postStore = usePostState();
  const userStore = useUserState();

  const hiddenLineRef = useRef<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    (async function() {
      if (data.length > 2) {
        let options = {
          root: null,
          rootMargin: '0px',
          threshold: 0.2
        }

        const request = await observerFn();

        observer.current = new IntersectionObserver(request, options);
        observer.current.observe(hiddenLineRef.current!)
      }
    })()

    return () => {
      if(observer.current){
        observer.current.disconnect();
      }
    }
  }, [])

  async function observerFn() {

    let from = 3, to = 5;

    return async function(entries: any){
      if(entries[0].isIntersecting){
        let payload = await postService.getPost(from, to, userStore.user.id!);

        if (payload.data?.length) {
          postStore.pushPayload(payload);
          from+=3;
          to+=3;
        } else {
          setShowSkeleton(false);
          observer.current!.disconnect();
        }
      }
    }
  }

  return (
    <>
      {data.map((item: IPost) => {
        return (
          <Post item={item} key={item.post_id} />
        );
      })}
      {
        data.length > 2 && showSkeleton?
          <div ref={hiddenLineRef}>
            <PostSkeleton/>
          </div>
          : null
      }
    </>
  );
}