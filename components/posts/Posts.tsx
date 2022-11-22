import { IPost } from "../../types/common.type";
import Post from "./Post";
import { useEffect, useRef } from "react";
import postService from "../../services/post.service";
import { usePostState } from "../../state/post.state";

interface Props {
  data: IPost[];
}

export default function Posts({ data }: Props) {
  const postStore = usePostState();
  const hiddenLineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    (async function() {
      if (data.length > 0) {
        let options = {
          root: null,
          rootMargin: '0px',
          threshold: 1.0
        }

        const request = await observerFn();

        observer = new IntersectionObserver(request, options);
        observer.observe(hiddenLineRef.current!)
      }
    })()

    return () => {
      if(observer){
        observer.disconnect();
      }
    }
  }, [])

  async function observerFn() {

    let from = 3, to = 5;

    return async function(entries: any, observer: any){
      if(entries[0].isIntersecting){
        let data = await postService.getPost(from, to);
        const payload = await data;
        postStore.pushPayload(payload);
        from+=3;
        to+=3;
      }
    }
  }

  return (
    <>
      {data.map((item: IPost) => {
        return (
          <>
            <Post item={item} key={item.post_id} />
          </>
        );
      })}
      {
        data.length > 0 ?
          <div ref={hiddenLineRef} style={{backgroundColor: 'red', width: '100%', height: "13px"}}/>
          : null
      }
    </>
  );
}