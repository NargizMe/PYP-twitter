export interface IPost{
  id: number;
  created_at: string;
  tweet: string;
  image: string | null;
  comment_count: number;
  save_count: number;
  retweet_count: number;
  user_id: string;
  post_id: string;
  comments: IComment[];
  users: IUser;
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