import PostForm from '../components/postForm/PostForm';
import Post from '../components/post/Post';

export default function Home() {
  return (
      <>
          <div style={{display: 'flex', flexDirection: 'column', gap: "20px"}}>
              <PostForm/>
              <Post/>
          </div>
      </>
  )
}
