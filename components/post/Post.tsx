"use client";
import styled from '@emotion/styled';
import Image from "next/image";
import img from "../../assets/images/me.jpg";
import { BiComment } from 'react-icons/bi';
import { AiOutlineRetweet } from 'react-icons/ai';
import { BsHeart } from 'react-icons/bs';
import { VscSave } from 'react-icons/vsc';
import { RiSendPlaneLine } from 'react-icons/ri';
import Comment from "../comment/Comment";

export default function Post(){
    return(
        <PostContainer>
            <ProfileImgContainer>
                <Img>
                    <Image alt = 'profile image' src={img}/>
                </Img>
                <ProfileInfo>
                    <h3>Mikael Stanley</h3>
                    <span>24 July at 13:00</span>
                </ProfileInfo>
            </ProfileImgContainer>
            <p>“We travel, some of us forever, to seek other places, other lives, other souls.” – Anais Nin</p>
            <PostImg>
                <Image alt="Post Image" src={img}/>
            </PostImg>
            <PostInfo>
                <li>449 Comments</li>
                <li>59k Retweet</li>
                <li>313 Saved</li>
            </PostInfo>
            <IconContainer>
                <button>
                    <BiComment/>
                    <span>Comment</span>
                </button>
                <button>
                    <AiOutlineRetweet/>
                    <span>Retweet</span>
                </button>
                <button>
                    <BsHeart/>
                    <span>Like</span>
                </button>
                <button>
                    <VscSave/>
                    <span>Save</span>
                </button>
            </IconContainer>
            <ProfileImgContainer>
                <Img>
                    <Image alt = 'profile image' src={img}/>
                </Img>
                <label>
                    <textarea placeholder='Tweet your reply' />
                    <button>
                        <RiSendPlaneLine/>
                    </button>
                </label>
            </ProfileImgContainer>
            <Line/>
            <Comment/>
        </PostContainer>
    )
}



// -----------------style-----------------
const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--backgrounf-gray-color);
  margin: 10px 0;
`
const PostContainer = styled.section`
  background-color: white;
  padding: 20px;
  border-radius: 13px;
  
  p{
    font-size: 16px;
    line-height: 22px;
    letter-spacing: -0.035em;
    color: var(--gray-second-color);
    margin: 20px 0;
  }
`

const ProfileImgContainer = styled.div`
  display: flex;
  align-items: center;

  label{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 7px;
    background: #FAFAFA;
    border: 1px solid var(--backgrounf-gray-color);
    width: 100%;
    position: relative;
    
    textarea{
      padding: 13px;
      border: none;
      background: #FAFAFA;
      resize: none;
      width: 100%;
      height: 40px;
    }
    
    button{
      border: none;
      background-color: transparent;
      position: absolute;
      right: 13px;
      
      svg{
        font-size: 17px;
        color: var(--main-blue-color);
      }
    }
  }
`

const Img = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 3px;
    display: flex;
    margin-right: 13px;
    
    img{
      width: 100%;
      height: 100%;
      border-radius: 3px;
    }
`

const ProfileInfo = styled.div`
  h3{
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.035em;
  }
  
  span{
    font-size: 15px;
    line-height: 16px;
    letter-spacing: -0.035em;
    color: var(--pale-gray-color);
  }
`

const PostImg = styled.div`
  border-radius: 13px;
  max-width: 705px;
  height: 375px;
  
  img{
      border-radius: 13px;
      width: 100%;
      height: 100%;
  }
`

const PostInfo = styled.ul`
  display: flex;
  justify-content: end;
  list-style: none;
  margin: 12px 0;
  
  li{
    font-size: 13px;
    line-height: 16px;
    letter-spacing: -0.035em;
    color: var(--pale-gray-color);
    
    :nth-child(2){
      margin: 0 15px;
    }
  }
`

const IconContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 3px;
  border-bottom: 1px solid var(--backgrounf-gray-color);
  border-top: 1px solid var(--backgrounf-gray-color);
  margin-bottom: 10px;

  button{
    border: none;
    background-color: transparent;
    display: flex;
    align-items: center;
    padding: 13px 40px;
    border-radius: 13px;
    cursor: pointer;
    
     svg{
       margin-right: 13px;
     }
    
    span{
      font-size: 16px;
      line-height: 19px;
      letter-spacing: -0.035em;
      color: var(--gray-second-color);
    }
    
    :hover{
      background-color: var(--backgrounf-gray-color);
    }
  }
`