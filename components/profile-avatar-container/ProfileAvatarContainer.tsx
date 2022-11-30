import { PATH_TO_USER_IMAGE } from "../../utils/constants";
import { useUserState } from "../../state/user.state";
import profileAvatarScss from './profileAvatar.module.scss';
import { useEffect, useState } from "react";
import userService from "../../services/user.service";
import { IUser } from "../../types/common.type";

export default function ProfileAvatarContainer(){
  const [user, setUser] = useState<IUser | null>(null);
  const [friendCount, setFriendCount] = useState<number>(0);

  const userStore = useUserState();

  useEffect(() => {
    (async() => {
      let userData = await userService.getUser(userStore.user.email!);
      if(userData.userData){
        setUser(userData.userData[0]);
      }

      // let usersData = await userService.getUsers();
      //
      // if(usersData.status === 'success' && usersData.data){
      //   usersData.data.forEach((item) => {
      //     console.log(item);
      //     item.followed.forEach((friend) => {
      //       if(friend.follower_id === user?.user_id){
      //         setFriendCount(prev => prev+1);
      //       }
      //     })
      //   })
      // }
    })()
  }, [])

  return (
    <div className={profileAvatarScss.profileBackground}>
      <div className={profileAvatarScss.profileAvatarContainer}>
        {
          userStore.user.image ?
            <img
              loading='lazy'
              alt="profile image"
              src={`${PATH_TO_USER_IMAGE}/${userStore.user.image}`}
            />
            :
            <div className={profileAvatarScss.defaultImg}>
              <p>{userStore.user.name?.slice(0, 1).toLocaleUpperCase()}</p>
            </div>
        }
        <div className={profileAvatarScss.profileInfoContainer}>
          {/*<div>*/}
            <h3>{userStore.user.name}</h3>
            {/*<span>{friendCount} friends</span>*/}
          {/*</div>*/}
          <p>{user?.about? user.about: null}</p>
        </div>
      </div>
    </div>
  )
}