import { BsHeart, BsHeartFill } from "react-icons/bs";
import postService from "../../services/post.service";
import { useUserState } from "../../state/user.state";
import { useState } from "react";
import { IPost } from "../../types/common.type";

interface Props{
  saveCount: IPost['like_count'];
  postId: IPost['post_id'];
  isLiked: boolean;
  onSaveDone: (status: boolean) => void;
}

export default function LikeButton({ saveCount, postId, isLiked, onSaveDone }: Props){
  const [likeStatus, setLikeStatus] = useState(isLiked);

  const userStore = useUserState();

  async function onLikePost(name: 'like_count' | 'retweet_count', count: number, post_id: string){
    if(!userStore.user.id){
      window.location.href = "/login-sign-up";
    }
    else{
      const likedRes = await postService.getSpecificLiked(post_id, userStore.user.id);

      // status success means user already liked - do like
      if(likedRes.status === 'success') {
        await unLike(name, count, post_id)
      }

      // status error means user already liked - do unlike
      if(likedRes.status === 'error'){
        await like(name, count, post_id)
      }
    }
  }

  async function like(name: 'like_count' | 'retweet_count', count: number, post_id: string){
    // immediately show like
    handleLikeLocalState(true);
    const {status, data, error} = await postService.saveLikedtoDB(post_id, userStore.user.id!);

    if(status === 'success'){
      const {status, data, error} = await postService.updatePost(name, count, post_id);

      // if updatePost is error
      if(status === 'error'){
        // ui show count
        handleLikeLocalState(false);
      }
    }

    // if saveLikedtoDB is error
    if(status === 'error'){
      handleLikeLocalState(false);
    }
  }

  async function unLike(name: 'like_count' | 'retweet_count', count: number, post_id: string){
    // immideatly show like
    handleLikeLocalState(false);
    const {status, data, error} = await postService.deleteLikedFromDB(post_id,userStore.user.id!);

    if(status === 'success'){
      const {status, data, error} = await postService.updatePost(name, count, post_id);

      // if updatePost is error
      if(status === 'error'){
        // ui show count
        handleLikeLocalState(true);
      }
    }

    // if saveLikedtoDB is error
    if(status === 'error'){
      handleLikeLocalState(true);
    }
  }

  function handleLikeLocalState(status: boolean){
    onSaveDone(status);
    setLikeStatus(status);
  }

  return(
    <button onClick={() => onLikePost('like_count', saveCount, postId)}>
      {
        likeStatus ? <BsHeartFill style={{ color: "red" }} /> : <BsHeart />
      }
      <span>{likeStatus? 'Liked': "Like"} </span>
    </button>
  )
}