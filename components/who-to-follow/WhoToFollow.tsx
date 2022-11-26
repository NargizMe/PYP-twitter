import WhoToFollowProfile from "./WhoToFollowProfile";
import whoToFollowScss from './whoToFollow.module.scss';
import { useEffect, useState } from "react";
import userService from "../../services/user.service";
import { IUser } from "../../types/common.type";
import postScss from "../posts/post.module.scss";

export default function WhoToFollow() {
  const[users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    (async() => {
      let usersData = await userService.getUsers();
      if(usersData.status === 'success' && usersData.data){
        setUsers(usersData.data);
      }
    })()
  }, [])

  return (
    <section className={whoToFollowScss.whoToFollowContainer}>
      <h4>Who to follow </h4>
      <div className={whoToFollowScss.scrollableDiv}>
        <div className={whoToFollowScss.scrollableContent}>
          <WhoToFollowProfile data={users}/>
        </div>
      </div>
    </section>
  );
}