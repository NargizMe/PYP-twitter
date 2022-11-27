import Image from "next/image";
import img from "../../assets/images/me.jpg";
import { CgProfile } from "react-icons/cg";
import whoToFollowProfileScss from "./whoToFollow.module.scss";
import { IUser } from "../../types/common.type";
import { PATH_TO_USER_IMAGE } from "../../utils/constants";
import postFormScss from "../post-form/postForm.module.scss";
import React, { useCallback, useRef, useState } from "react";
import { useUserState } from "../../state/user.state";
import userService from "../../services/user.service";

interface Props {
  item: IUser;
}

export default function WhoToFollowProfile({ item }: Props) {
  const [followText, setFollowText] = useState(false);

  const followersCountRef = useRef<HTMLSpanElement | null>(null);
  const userState = useUserState();

  async function handleFollow(id: IUser['user_id']){
    if(!userState.user.id){
      window.location.href = "/login-sign-up";
      return;
    }

    else{
      const followedUser = await userService.getSpecificFollowed(userState.user.id, id);

      // status error means user did not follow - do follow
      if(followedUser.status === 'error'){
        follow(id);
        onFollowDone(followText);
      }

      // status success means user already followed - do unfollow
      if(followedUser.status === 'success'){
        unFollow(id);
        onFollowDone(followText);
      }
    }
  }

  const onFollowDone = useCallback((status: boolean) => {
    const followersCount = followersCountRef.current?.innerText.split(" ")[0] as string;
    followersCountRef.current!.innerText = `${status? +followersCount-1: +followersCount+1} Followers`
  },[])

  async function follow(id: IUser['user_id']){
    setFollowText(true);
    const savedFollower = await userService.saveFollowedtoDB(userState.user.id!, id);

    if(savedFollower.status === 'error'){
      setFollowText(false);
    }
  }

  async function unFollow(id: IUser['user_id']){
    setFollowText(false);
    const deleteFollower = await userService.deleteFollowedFromDB(userState.user.id!, id);

    if(deleteFollower.status === 'error'){
      setFollowText(true);
    }
  }

  return (
    <div key={item.user_id}>
      <div className={whoToFollowProfileScss.whoToFollowProfileProfileContainer}>
        <div className={whoToFollowProfileScss.whoToFollowProfileImgContainer}>
          {
            item.image ?
              <img className={whoToFollowProfileScss.whoToFollowProfileImg}
                   alt="profile image" src={`${PATH_TO_USER_IMAGE}/${item.image}`}
              />
              :
              <div className={postFormScss.defaultImg}>
                <p>{item.name?.slice(0, 1).toLocaleUpperCase()}</p>
              </div>
          }
          <div className={whoToFollowProfileScss.whoToFollowProfileInfo}>
            <h3>{item.name}</h3>
            <span ref={followersCountRef}>{item.followed.length} followers</span>
          </div>
        </div>
        <button type='button' onClick={() => handleFollow(item.user_id)}>
          <CgProfile />
          <span>{followText? 'Followed': 'Follow'} </span>
        </button>
      </div>
      <p>{item.about}</p>
      <div className={whoToFollowProfileScss.line} />
    </div>
  );
}