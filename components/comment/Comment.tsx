import Image from "next/image";
import img from "../../assets/images/me.jpg";
import { AiOutlineHeart } from 'react-icons/ai';
import commentScss from './comment.module.scss';

export default function Comment(){
    return(
        <div className={commentScss.commentContainer}>
            <div className={commentScss.commentImageContainer}>
                <Image alt = 'profile image' src={img}/>
            </div>
            <div>
                <div className={commentScss.commentTextContainer}>
                    <div className={commentScss.commentInfo}>
                        <h4>Waqar Bloom</h4>
                        <span>24 August at 20:43 </span>
                    </div>
                    <p>
                        I’ve felt this pull many times, like while road tripping through Morocco. Seeking out the vastness of the desert, and looking inward at the same time.
                    </p>
                </div>
                <div className={commentScss.commentLikeContainer}>
                    <button>
                        <AiOutlineHeart/>
                        <span>Like</span>
                    </button>
                    <button>
                        12k Likes
                    </button>
                </div>
            </div>
        </div>
    )
}