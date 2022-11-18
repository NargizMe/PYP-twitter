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
  users: any;
}

export interface IComment{
  id: number;
  comment_id: string;
  created_at: string;
  text: string;
  like_count: number;
  user_id: string
  user: IUser;
}

export interface IUser{
  id: number;
  email: string;
  name: string;
  image: string | null
}

// export interface IPost{
//   tweet: string;
//   retweet_count: number;
//   save_count: number;
//   user_id: string;
//   image: string | null;
// }