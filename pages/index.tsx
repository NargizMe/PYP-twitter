import supabase from "../config/supabaseClient";
import PostForm from "../components/post-form/PostForm";
import Posts from "../components/posts/Posts";
import WhoToFollow from "../components/who-to-follow/WhoToFollow";
import { useUserState } from "../state/user.state";
import postService from "../services/post.service";
import { useEffect, useState } from "react";
import { usePostState } from "../state/post.state";

const mainStyles = {
  display: "grid",
  gridTemplateColumns: "745px 306px",
  justifyContent: "center",
  gridGap: "25px",
  padding: "25px 0"
};

export default function Home() {
  const userStore = useUserState();
  const postStore = usePostState();

  useEffect(() => {
    (async() => {
      let data = await postService.getPost();
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
    <div style={mainStyles}>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {
          userStore.user.id? <PostForm />: null
        }
        {renderPosts()}
      </div>
      <div>
        <WhoToFollow />
      </div>
    </div>
  );
}