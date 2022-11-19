import Image from "next/image";
import img from "../../assets/images/me.jpg";
import { CgProfile } from "react-icons/cg";
import whoToFollowProfileScss from "./whoToFollow.module.scss";


export default function WhoToFollowProfile() {
  return (
    <div>
      <div className={whoToFollowProfileScss.whoToFollowProfileImgContainer}>
        <div className={whoToFollowProfileScss.whoToFollowProfileImg}>
          <Image alt="profile image" src={img} width={50} height={50} />
        </div>
        <div className={whoToFollowProfileScss.whoToFollowProfileInfo}>
          <h3>Mikael Stanley</h3>
          <span>230k followers</span>
        </div>
        <button>
          <CgProfile />
          <span>Follow</span>
        </button>
      </div>
      <p>Photographer & Filmmaker based in Copenhagen, Denmark ✵ 🇩🇰</p>
      <div className={whoToFollowProfileScss.whoToFollowProfileBanner}>
        <Image alt="banner photo" src={img} />
      </div>
      <div className={whoToFollowProfileScss.line}/>
    </div>
  );
}