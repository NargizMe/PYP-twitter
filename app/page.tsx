"use client"
import supabase from "../config/supabaseClient";
import PostForm from "../components/post-form/PostForm";
import Post from "../components/post/Post";
import WhoToFollow from "../components/who-to-follow/WhoToFollow";
import { use } from "react";
import { useUserState } from "../state/user.state";

const mainStyles = {
  display: "grid",
  gridTemplateColumns: "745px 306px",
  justifyContent: "center",
  gridGap: "25px",
  padding: "25px 0"
};

export async function getPosts(): Promise<{ status: "error" | "success" | "pending"; data: any }> {
  let { data, error } = await supabase
    .from("posts")
    .select(`*, users(name)`);

  if (error) {
    return {
      status: "error",
      data: error
    };
  }
  if (data) {
    return {
      status: "success",
      data: data
    };
  }

  return {
    status: "pending",
    data: null
  };
}

export default function Home() {
  const payload = use(getPosts());
  const userStore = useUserState();

  function renderPosts() {
    if (payload.status === "success") {
      return (
        <Post data={payload.data} />
      );
    }

    if (payload.status === "error") {
      return (
        <div>Error: Couldn't get any data</div>
      );
    }
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