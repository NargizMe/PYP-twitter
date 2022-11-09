"use client";
import styled from '@emotion/styled';
import Image from "next/image";
import img from "../../assets/images/me.jpg";
import { MdOutlineImage } from 'react-icons/md';

export default function PostForm(){
    return(
        <Form>
            <label htmlFor = 'tweet-input'>Tweet something</label>
            <hr/>
            <ProfileImgContainer>
                <div>
                    <Image alt = 'profile image' src={img}/>
                </div>
                <textarea id = 'tweet-input' placeholder="What's happening?" />
            </ProfileImgContainer>
            <UploadImgContainer>
                <label htmlFor='img'>
                    <MdOutlineImage/>
                    <input type="file" id="img" name="img" accept="image/*"/>
                </label>
                <button>Tweet</button>
            </UploadImgContainer>
        </Form>
    )
}



// -----------------style-----------------
const Form = styled.form`
  width: 745px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  border-radius: 13px;
  background-color: white;
  padding: 10px 20px;
  
  label{
      font-weight: 600;
      line-height: 18px;
      letter-spacing: -0.035em;
      color: var(--gray-second-color);
  } 
  
  hr{
    margin: 8px 0;
  }
`

const ProfileImgContainer = styled.div`
  display: flex;
  
  div{
    width: 32px;
    height: 32px;
    border-radius: 3px;
    display: flex;
    margin-right: 13px;

    img{
      width: 100%;
      height: 100%;
      border-radius: 3px;
    }
  }
  
  textarea{
    width: 100%;
    height: 76px;
    text-align-all: center;
    border: none;
    resize: none;
    font-size: 15px;
  }
`

const UploadImgContainer = styled.div`
  display: flex;
  justify-content: space-between;
  
  label{
    cursor: pointer;
    margin-left: 50px;
    
    svg{
      color: var(--main-blue-color);
      font-size: 25px;
    }

    input{
      display: none;
    }
  }
  
  button{
    padding: 8px 25px;
    background-color: var(--main-blue-color);
    border: none;
    border-radius: 3px;
    color: white;
  }
`