import styled from "@emotion/styled";
import Image from "next/image";
import img from "../../assets/images/me.jpg";
import { AiOutlineHeart } from 'react-icons/ai';

export default function Comment(){
    return(
        <CommentContainer>
            <Img>
                <Image alt = 'profile image' src={img}/>
            </Img>
            <div>
                <TextContainer>
                    <CommentInfo>
                        <h4>Waqar Bloom</h4>
                        <span>24 August at 20:43 </span>
                    </CommentInfo>
                    <p>
                        I’ve felt this pull many times, like while road tripping through Morocco. Seeking out the vastness of the desert, and looking inward at the same time.
                    </p>
                </TextContainer>
                <LikeContainer>
                    <button>
                        <AiOutlineHeart/>
                        <span>Like</span>
                    </button>
                    <button>
                        12k Likes
                    </button>
                </LikeContainer>
            </div>
        </CommentContainer>
    )
}

const CommentContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`

const Img = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 3px;
    display: flex;
    
    img{
      width: 40px;
      height: 100%;
      border-radius: 3px;
    }
`

const TextContainer = styled.div`
  background: #FAFAFA;
  border-radius: 8px;
  padding: 20px 15px;
  
  p{
    margin: 0;
    margin-top: 10px;
  }
`

const CommentInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  
  h4{
    font-size: 14px;
    line-height: 21px;
    letter-spacing: -0.035em;
  }
  
  span{
    line-height: 16px;
    letter-spacing: -0.035em;
    color: var(--pale-gray-color);
    font-size: 12px;
  }
`

const LikeContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 5px;
  
  button{
    border: none;
    background-color: transparent;
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 12px;
    color: var(--pale-gray-color);
    cursor: pointer;

    svg{
      font-size: 14px;
    }
  }
`