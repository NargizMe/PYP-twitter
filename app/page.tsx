"use client"
import PostForm from '../components/postForm/PostForm';
import Post from '../components/post/Post';
import WhoToFollow from "../components/whoToFollow/WhoToFollow";
import styled from "@emotion/styled";

export default function Home() {
  return (
      <Main>
          <div style={{display: 'flex', flexDirection: 'column', gap: "20px"}}>
              <PostForm/>
              <Post/>
          </div>
          <div>
              <WhoToFollow/>
          </div>
      </Main>
  )
}

const Main = styled.main`
  display: grid;
  grid-template-columns: 745px 306px;
  justify-content: center;
  grid-gap: 25px;
  padding: 25px 0;
`