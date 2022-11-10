"use client";
import styled from '@emotion/styled';
import WhoToFollowProfile from "./WhoToFollowProfile";

export default function WhoToFollow(){
    return(
        <WhoToFollowContainer>
            <h4>Who to follow</h4>
            <WhoToFollowProfile/>
            <WhoToFollowProfile/>
        </WhoToFollowContainer>
    )
}



// -----------------style-----------------
const WhoToFollowContainer = styled.section`
  background-color: white;
  border-radius: 13px;
  padding: 13px 20px;
  
  h4{
    font-weight: 600;
    line-height: 18px;
    letter-spacing: -0.035em;
    color: var(--gray-second-color);
    padding-bottom: 8px;
    border-bottom: 1px solid var(--backgrounf-gray-color);
  }
  
  p{
    font-size: 14px;
    line-height: 19px;
    letter-spacing: -0.035em;
    color: var(--dark-gray-color);
    margin: 20px 0;
  }
`