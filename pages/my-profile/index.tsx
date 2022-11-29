import mainScss from '../../assets/main.module.scss';
import SearchingInMyProfile from "../../components/searching-in-my-profile/SearchingInMyProfile";
import { useUserState } from "../../state/user.state";
import { usePostState } from "../../state/post.state";
import { useEffect } from "react";
import postService from "../../services/post.service";
import Posts from "../../components/posts/Posts";

export default function MyProfile() {

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
    <main className={mainScss.myProfileMain}>
      <div>
        <SearchingInMyProfile/>
      </div>
      <div>
        {renderPosts()}
      </div>
    </main>
  );
}