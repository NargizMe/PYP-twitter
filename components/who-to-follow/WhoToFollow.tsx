import WhoToFollowProfile from "./WhoToFollowProfile";
import whoToFollowScss from './whoToFollow.module.scss';
import { useEffect, useState } from "react";
import userService from "../../services/user.service";
import { IUser } from "../../types/common.type";
import { useUserState } from "../../state/user.state";

export default function WhoToFollow() {
  const[users, setUsers] = useState<IUser[]>([]);

  const userState = useUserState();

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
          {
            users?.map((item) => {
              if(!item.followed.find((item) => item.follower_id === userState.user.id)
                && userState.user.id!== item.user_id)
              {
                return <WhoToFollowProfile item={item} key={item.id} />
              }
            })
          }
        </div>
      </div>
    </section>
  );
}