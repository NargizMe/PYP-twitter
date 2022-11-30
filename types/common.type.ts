export interface IPost{
  created_at: string;
  tweet: string;
  image: string | null;
  retweet_count: number;
  user_id: IUser['user_id'];
  post_id: string;
  comments: IComment[];
  liked: ILiked[];
  number_of_comments: Array<{count: number}>;
  number_of_likes: Array<{count: number}>;
  users: {
    name: IUser['name'];
    image: IUser['image'];
  };
}

export interface ILiked{
  user_id: IUser['user_id'];
}

export interface IRetweeted{
  user_id: IUser['user_id'];
  post_id: IPost['post_id'];
}

export interface ILikedPosts{
  created_at: string;
  id: number;
  saved_id: string;
  user_id: IUser['user_id'];
  post_id: IPost['post_id'];
  posts: IPost
}

export interface IFollowed{
  followed_id: IUser['user_id'];
  follower_id: IUser['user_id'];
  follow_id: string;
}

export interface IPostRequest{
  created_at: Date;
  tweet: string;
  image: string | null;
  retweet_count: number;
  user_id: IUser['user_id'];
  post_id: string;
}

export interface IComment{
  id: number;
  comment_id: string;
  created_at: string;
  comment: string;
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
  followed: Array<{ follower_id: IFollowed['follower_id'] }>;
  image: string | null;
  about: string | null;
}

export interface IResponse<T>{
  status: 'error' | 'success' | 'pending';
  data: null | T;
  error: any;
}