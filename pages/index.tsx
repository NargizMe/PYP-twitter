import PostForm from "../components/post-form/PostForm";
import Posts from "../components/posts/Posts";
import WhoToFollow from "../components/who-to-follow/WhoToFollow";
import { useUserState } from "../state/user.state";
import postService from "../services/post.service";
import { useEffect, useState } from "react";
import { usePostState } from "../state/post.state";
import mainScss from '../assets/main.module.scss';

export default function Home() {
  const userStore = useUserState();
  const postStore = usePostState();

  useEffect(() => {
    (async() => {
      let data = await postService.getPost(0, 2, userStore.user.id!);
      postStore.setPayload(await data)
    })()
  }, [])


  function renderPosts() {
    if (postStore.payload.status === "success") {
      return (
        <Posts data={postStore.payload.data!} />
      );
    }

    if (postStore.payload.status === "error") {
      return (
        <div>Error: Couldn't get any data</div>
      );
    }

    return null;
  }

  return (
    <main className={mainScss.main}>
      <div>
        {
          userStore.user.id? <PostForm />: null
        }
        {renderPosts()}
      </div>
      <WhoToFollow />
    </main>
  );
}