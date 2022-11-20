import { format } from "date-fns";
import img from "../../assets/images/me.jpg";
import { BiComment } from "react-icons/bi";
import { AiOutlineRetweet } from "react-icons/ai";
import { BsHeart } from "react-icons/bs";
import { VscSave } from "react-icons/vsc";
import { RiSendPlaneLine } from "react-icons/ri";
import Comment from "../comment/Comment";
import postScss from './post.module.scss';
import { PATH_TO_USER_IMAGE } from "../../utils/constants";
import { useUserState } from "../../state/user.state";

interface Props {
  data: any;
}

export default function Post({ data }: Props) {

  const userStore = useUserState();

  function handleDateFormat(date: string) {
    const newDate = new Date(date);
    let result = format(newDate, "dd MMMM") + " at " + format(newDate, "HH:mm");
    return result;
  }

  return (
    data.map((item: any, i: number) => {
      console.log(`${PATH_TO_USER_IMAGE}/${item.users.image}`);
      return (
        <section className={postScss.postMain} key={i}>
          <div className={postScss.postProfileImgContainer}>
            {
              item.users?.image?
                <img className={postScss.postProfileImg} alt="profile image" src={`${PATH_TO_USER_IMAGE}/${item.users.image}`} />
              :
                <div className={postScss.defaultImg}>
                  <p>{item.users.name?.slice(0, 1).toLocaleUpperCase()}</p>
                </div>
            }
            <div className={postScss.postProfileInfo}>
              <h3>{item.users.name}</h3>
              <span>{handleDateFormat(item.created_at)}</span>
            </div>
          </div>
          <p>{item.tweet}</p>
          {
            item.image?
              <div className={postScss.postImg}>
                <img alt="Post Image"  src={`${PATH_TO_USER_IMAGE}/${item.image}`} />
              </div>
            :null
          }
          <ul className={postScss.postInfo}>
            <li>{item.comment_count} Comments</li>
            <li>{item.retweet_count} Retweet</li>
            <li>{item.save_count} Saved</li>
          </ul>
          <div className={postScss.postIconContainer}>
            <button>
              <BiComment />
              <span>Comment</span>
            </button>
            <button>
              <AiOutlineRetweet />
              <span>Retweet</span>
            </button>
            <button>
              <BsHeart />
              <span>Like</span>
            </button>
            <button>
              <VscSave />
              <span>Save</span>
            </button>
          </div>
          <div className={postScss.postProfileImgContainer}>
            {
              userStore.user.image?
                <img className={postScss.postProfileImg} alt="profile image" src={`${PATH_TO_USER_IMAGE}/${item.users.image}`} />
              :
                <div className={postScss.defaultImg}>
                  <p>{userStore.user.name?.slice(0, 1).toLocaleUpperCase()}</p>
                </div>
            }
            <label>
              <textarea placeholder="Tweet your reply" />
              <button>
                <RiSendPlaneLine />
              </button>
            </label>
          </div>
          <div className={postScss.line} />
          <Comment />
        </section>
      );
    })
  );
}