export interface IPost{
  created_at: string;
  tweet: string;
  image: string | null;
  like_count: number;
  retweet_count: number;
  user_id: IUser['user_id'];
  post_id: string;
  comments: IComment[];
  liked: ILiked[];
  users: {
    name: IUser['name'];
    image: IUser['image'];
  };
}

export interface ILiked{
  user_id: IUser['user_id'],
}

export interface IPostRequest{
  created_at: Date;
  tweet: string;
  image: string | null;
  like_count: number;
  retweet_count: number;
  user_id: IUser['user_id'];
  post_id: string;
}

export interface IComment{
  id: number;
  comment_id: string;
  created_at: string;
  comment: string;
  like_count: number;
  user_id: string
  users: IUser;
  post_id: string
  posts: IPost;
}

export interface IUser{
  id: number;
  user_id: string;
  email: string;
  name: string;
  follower_count: number | null;
  image: string | null;
  about: string | null;
}

export interface IResponse<T>{
  status: 'error' | 'success' | 'pending';
  data: null | T;
  error: any;
}