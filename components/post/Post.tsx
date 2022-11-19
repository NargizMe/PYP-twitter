import Image from "next/image";
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

interface Props {
  data: any;
}

export default function Post({ data }: Props) {

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
            <div className={postScss.postProfileImg}>
              {
                item.users?.image?
                  <Image alt="profile image" src={`${PATH_TO_USER_IMAGE}/${item.users.image}`} width={50} height={50} />
                :
                  <Image alt="profile image" src={img} width={50} height={50} />
              }
            </div>
            <div className={postScss.postProfileInfo}>
              <h3>{item.users.name}</h3>
              <span>{handleDateFormat(item.created_at)}</span>
            </div>
          </div>
          <p>{item.tweet}</p>
          {
            item.image?
              <div className={postScss.postImg}>
                    <Image alt="Post Image"  src={`${PATH_TO_USER_IMAGE}/${item.image}`} width={50} height={50} />
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
            <div className={postScss.postProfileImg}>
              <Image alt="profile image" src={img} width={50} height={50} />
            </div>
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