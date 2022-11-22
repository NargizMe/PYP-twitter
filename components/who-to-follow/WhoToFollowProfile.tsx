import Image from "next/image";
import img from "../../assets/images/me.jpg";
import { CgProfile } from "react-icons/cg";
import whoToFollowProfileScss from "./whoToFollow.module.scss";
import { IUser } from "../../types/common.type";
import { PATH_TO_USER_IMAGE } from "../../utils/constants";
import postFormScss from "../post-form/postForm.module.scss";
import React from "react";
import { useUserState } from "../../state/user.state";

interface Props {
  data: IUser[];
}

export default function WhoToFollowProfile({ data }: Props) {
  const userState = useUserState();

  function handleFollow(){
    if(!userState.user.id){
      window.location.href = "/login-sign-up";
      return;
    }
  }

  return (
    <>
      {
        data?.map((item) => {
          return item.user_id !== userState.user.id ?
            <div key={item.user_id}>
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
                  <span>{item.follower_count} followers</span>
                </div>
                <button type='button' onClick={handleFollow}>
                  <CgProfile />
                  <span>Follow</span>
                </button>
              </div>
              <p>{item.about}</p>
              {/*<div className={whoToFollowProfileScss.whoToFollowProfileBanner}>*/}
              {/*  <Image alt="banner photo" src={img} />*/}
              {/*</div>*/}
              <div className={whoToFollowProfileScss.line} />
            </div>
            : null;
        })
      }
    </>
  );
}