import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { MdOutlineCancelPresentation, MdOutlineImage } from "react-icons/md";
import React, { ChangeEvent, MouseEvent, useState } from "react";
import postFormScss from "./postForm.module.scss";
import postService from "../../services/post.service";
import { useUserState } from "../../state/user.state";
import { PATH_TO_USER_IMAGE } from "../../utils/constants";
import { usePostState } from "../../state/post.state";
import { IPostRequest } from "../../types/common.type";

export default function PostForm() {
  const [url, setUrl] = useState("");
  const [tweet, setTweet] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [imgVal, setImgVal] = useState('');

  const userState = useUserState();
  const postStore = usePostState();

  function onUploadImage(e: ChangeEvent<HTMLInputElement>) {
    const file = Array.from(e.target.files as FileList)[0];
    const localUrl = URL.createObjectURL(file);
    setUrl(localUrl);
    setFile(file);
  }

  function handleCancelImage(e: MouseEvent<HTMLButtonElement>){
    setImgVal('');
    setUrl('');
  }

  async function onPost(e: any) {
    e.preventDefault();

    setLoading(true);

    const payloadCreatedAt = new Date();
    const payLoad: IPostRequest = {
      tweet: tweet,
      image: "",
      user_id: userState.user.id!,
      post_id: uuidv4(),
      retweet_count: 0,
      created_at: payloadCreatedAt,
    };
    const upLoad = await postService.uploadImage(file);

    if (upLoad.status === "success") {
      payLoad.image = upLoad.imageData!.path as string;
    }

    const post = await postService.savePostToDB(payLoad);

    if (post.status === "success") {
      postStore.pushSinglePayload({
        ...payLoad,
        created_at: payloadCreatedAt.toString(),
        users: {
          name: userState.user.name!,
          image: userState.user.image
        },
        number_of_comments: [{ count: 0 }],
        number_of_likes: [{ count: 0 }],
        comments: [],
        liked: []
      });

      setUrl("");
      setTweet("");
      setFile(null);
    }

    setLoading(false);
  }

  return (
    <form className={postFormScss.postForm}>
      <label htmlFor="tweet-input">Tweet something</label>
      <div className={postFormScss.line} />
      <div className={postFormScss.postFormImgContainer}>
        {
          userState.user.image ?
            <img alt="profile image" src={`${PATH_TO_USER_IMAGE}/${userState.user.image}`} />
            :
            <div className={postFormScss.defaultImg}>
              <p>{userState.user.name?.slice(0, 1).toLocaleUpperCase()}</p>
            </div>
        }
        <textarea
          id="tweet-input"
          placeholder="What 's happening?"
          value={tweet}
          onChange={e => setTweet(e.target.value)}
        />
      </div>
      {
        url ?
          <div className={postFormScss.postFormUploadImg}>
            <img src={url} alt="post photo"/>
            <button onClick={handleCancelImage} type='button'>
              <MdOutlineCancelPresentation />
            </button>
          </div>
          : null
      }
      <div className={postFormScss.postFormUploadImgContainer}>
        <label htmlFor="img">
          <MdOutlineImage />
          <input
            type="file"
            id="img"
            name="img"
            value={imgVal}
            accept="image/*"
            onChange={onUploadImage}
          />
        </label>
        <button className={postFormScss.postSubmit} onClick={onPost} disabled={loading}>
          {loading ? "Tweeting" : "Tweet"}
        </button>
      </div>
    </form>
  );
}