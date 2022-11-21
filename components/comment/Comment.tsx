import Image from "next/image";
import img from "../../assets/images/me.jpg";
import { AiOutlineHeart } from "react-icons/ai";
import commentScss from "./comment.module.scss";
import { IComment } from "../../types/common.type";
import { format } from "date-fns";
import postScss from "../post/post.module.scss";
import { PATH_TO_USER_IMAGE } from "../../utils/constants";

interface Props {
  data: IComment;
}

export default function Comment({ data }: Props) {

  function handleDateFormat(date: string) {
    const newDate = new Date(date);
    let result = format(newDate, "dd MMMM") + " at " + format(newDate, "HH:mm");
    return result;
  }

  return (
    <div className={commentScss.commentContainer}>
      {
        data.users?.image ?
          <img className={postScss.postProfileImg} alt="profile image"
               src={`${PATH_TO_USER_IMAGE}/${data.users.image}`} />
          :
          <div className={postScss.defaultImg}>
            <p>{data.users.name?.slice(0, 1).toLocaleUpperCase()}</p>
          </div>
      }
      <div>
        <div className={commentScss.commentTextContainer}>
          <div className={commentScss.commentInfo}>
            <h4>{data.users.name}</h4>
            <span>{handleDateFormat(data.created_at)}</span>
          </div>
          <p>{data.comment}</p>
        </div>
        <div className={commentScss.commentLikeContainer}>
          <button>
            <AiOutlineHeart />
            <span>Like</span>
          </button>
          <button>{data.like_count} Likes</button>
        </div>
      </div>
    </div>
  );
}