"use client";
import styled from '@emotion/styled';
import Image from "next/image";
import img from "../../assets/images/me.jpg";
import { CgProfile } from 'react-icons/cg';

export default function WhoToFollowProfile(){
    return(
        <div>
            <ProfileImgContainer>
                <Img>
                    <Image alt = 'profile image' src={img}/>
                </Img>
                <ProfileInfo>
                    <h3>Mikael Stanley</h3>
                    <span>230k followers</span>
                </ProfileInfo>
                <button>
                    <CgProfile/>
                    <span>Follow</span>
                </button>
            </ProfileImgContainer>
            <p>Photographer & Filmmaker based in Copenhagen, Denmark ✵ 🇩🇰</p>
            <BannerImageContainer>
                <Image alt = 'banner photo' src={img} />
            </BannerImageContainer>
        </div>
    )
}


// -----------------style-----------------
const ProfileImgContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 24px;

  label{
    padding-right: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 7px;
    background: #FAFAFA;
    border: 1px solid var(--backgrounf-gray-color);
    width: 100%;
    
    input{
      padding: 12px;
      border: none;
      background: #FAFAFA;
    }
  }
  
  button{
    border: none;
    border-radius: 5px;
    padding: 7px 13px;
    display: flex;
    align-items: center;
    gap: 5px;
    color: white;
    background-color: var(--main-blue-color);
    cursor: pointer;
  }
`

const Img = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 3px;
    display: flex;
    
    img{
      width: 100%;
      height: 100%;
      border-radius: 3px;
    }
`

const ProfileInfo = styled.div`
  margin: 0 19px;
  
  h3{
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.035em;
  }
  
  span{
    font-size: 12px;
    line-height: 16px;
    letter-spacing: -0.035em;
    color: var(--pale-gray-color);
  }
`

const BannerImageContainer = styled.div`
  width: 100%;
  height: 100px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom: 1px solid var(--backgrounf-gray-color);
  
  img{
    width: 100%;
    height: 80px;
    border-radius: 8px;
  }
`