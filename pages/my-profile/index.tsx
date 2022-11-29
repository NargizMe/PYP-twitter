import mainScss from '../../assets/main.module.scss';
import SearchingInMyProfile from "../../components/searching-in-my-profile/SearchingInMyProfile";
import { useUserState } from "../../state/user.state";
import { usePostState } from "../../state/post.state";
import { useEffect, useState } from "react";
import postService from "../../services/post.service";
import Posts from "../../components/posts/Posts";
import { useLikedState } from "../../state/liked.state";
import { IPost, IResponse } from "../../types/common.type";

export default function MyProfile() {
  const [list, setList] = useState<IPost[]>([]);

  const userStore = useUserState();
  const postStore = usePostState();
  const likedStore = useLikedState();

  useEffect(() => {

    getDataByFilteredWord();
  }, [likedStore.payload])

  function renderPosts(data: IResponse<IPost[]>) {
    if (data.status === "success") {
      setList(data.data!);
    }

    if (data.status === "error") {

    }
  }

  async function getDataByFilteredWord(){
    if(likedStore.payload === 'tweet'){
      let response = await postService.getUsersPosts(0, 2, userStore.user.id!);
      renderPosts(response);
    }
    if(likedStore.payload === 'liked'){
      let response = await postService.getLikedPosts(0, 2, userStore.user.id!);
      const normalizedData = {
        ...response,
        data: Array.isArray(response.data) ? response.data.map((obj) => obj.posts) : []
      }
      renderPosts(normalizedData);
    }
  }

  return (
    <main className={mainScss.myProfileMain}>
      <div>
        <SearchingInMyProfile/>
      </div>
      <div>
        <Posts data={list} />
      </div>
    </main>
  );
}