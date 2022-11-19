import supabase from "../config/supabaseClient";
import PostForm from "../components/post-form/PostForm";
import Post from "../components/post/Post";
import WhoToFollow from "../components/who-to-follow/WhoToFollow";
import { useUserState } from "../state/user.state";
import useGetAllPosts from "../components/post/useGetAllPosts";

const mainStyles = {
  display: "grid",
  gridTemplateColumns: "745px 306px",
  justifyContent: "center",
  gridGap: "25px",
  padding: "25px 0"
};

export default function Home() {
  const userStore = useUserState();
  const postState = useGetAllPosts();


  function renderPosts() {
    if (postState.status === "success") {
      return (
        <Post data={postState.data} />
      );
    }

    if (postState.status === "error") {
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