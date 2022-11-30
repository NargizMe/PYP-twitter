import supabase from "../config/supabaseClient.supabase";
import { ILiked, ILikedPosts, IPost, IResponse, IUser } from "../types/common.type";
import { v4 as uuidv4 } from "uuid";

const postService = {
  getPost: async (from: number = 0, to: number = 2, userId: IUser['user_id']): Promise<IResponse<IPost[]>> => {
    let { data, error } = await supabase
      .from("posts")
      .select(`*, users(name, image), comments(*, users(name, image)), number_of_comments:comments(count), liked(user_id), number_of_likes:liked(count)`)
      .eq('liked.user_id', userId || uuidv4())
      .order('created_at', {
        foreignTable: 'comments',
        ascending: false
      })
      .order('created_at', {
        ascending: false
      })
      .limit(3, {
        foreignTable: 'comments'
      })
      .range(from, to);

    if (error) {
      return { status: 'error', data: null, error }
    }
    if (data) {
      return { status: 'success', data, error: null }
    }

    return { status: 'pending', data: null, error: null }
  },

  getUsersPosts: async (from: number = 0, to: number = 2, userId: IUser['user_id']): Promise<IResponse<IPost[]>> => {
    let { data, error } = await supabase
      .from("posts")
      .select(`*, users(name, image), comments(*, users(name, image)), number_of_comments:comments(count), liked(user_id), number_of_likes:liked(count)`)
      .eq('liked.user_id', userId || uuidv4())
      .eq('user_id', userId)
      .order('created_at', {
        foreignTable: 'comments',
        ascending: false
      })
      .order('created_at', {
        ascending: false
      })
      .limit(3, {
        foreignTable: 'comments'
      })
      .range(from, to);

    if (error) {
      return { status: 'error', data: null, error }
    }
    if (data) {
      return { status: 'success', data, error: null }
    }

    return { status: 'pending', data: null, error: null }
  },

  getLikedPosts: async (from: number = 0, to: number = 2, userId: IUser['user_id']): Promise<IResponse<ILikedPosts[]>> => {
    let { data, error } = await supabase
      .from("liked")
      .select(`*, posts(*, users(name, image), comments(*, users(name, image)), number_of_comments:comments(count), liked(user_id), number_of_likes:liked(count))`)
      .eq('user_id', userId)
      .eq('posts.liked.user_id', userId || uuidv4())
      .order('created_at', {
        foreignTable: 'posts.comments',
        ascending: false
      })
      .order('created_at', {
        ascending: false
      })
      .limit(3, {
        foreignTable: 'posts.comments'
      })
      .range(from, to);

    if (error) {
      return { status: 'error', data: null, error }
    }
    if (data) {
      return { status: 'success', data, error: null }
    }

    return { status: 'pending', data: null, error: null }
  },

  updatePost: async (name: 'retweet_count' | 'like_count', count: number, id: IPost['post_id']) => {
    let { data, error } = await supabase
      .from(`posts`)
      .update({ [name] :  count})
      .eq('post_id', id )
      .select()

    if (error) {
      return { status: 'error', data: null, error }
    }
    if (data) {
      return { status: 'success', data, error: null }
    }

    return { status: 'pending', data: null, error: null }
  },

  uploadImage: async (tweetImage: File | null) => {
    if(tweetImage){
      const fileName = Date.now().toString() + "-" + tweetImage.name
      const { data: imageData, error: imageError } = await supabase.storage
        .from("images")
        .upload("public/" + fileName, tweetImage);

      return { status: 'success', imageData: {path: imageData!.path.slice(7)}, imageError }
    }

    return { status: 'fail', imageData: null, imageError:'tweetImage is null' }
  },

  savePostToDB: async (values: Pick<IPost, "tweet" & "image" & "user_id">):Promise<IResponse<unknown>> => {
    const { data, error } = await supabase
      .from("posts")
      .insert([values])

    if(error){
      return { status: 'error', data: null, error }
    }

    return { status: 'success', data: values, error: null }
  },

  saveLikedtoDB: async (post_id: IPost['post_id'], user_id: IUser['user_id']):Promise<IResponse<unknown>> => {
    const { data, error } = await supabase
      .from("liked")
      .insert([{post_id, user_id}])

    if(error){
      return { status: 'error', data: null, error }
    }

    return { status: 'success', data: {post_id, user_id}, error: null }
  },

  deleteLikedFromDB: async (post_id: IPost['post_id'], user_id: IUser['user_id']):Promise<IResponse<unknown>> => {
    const { data, error } = await supabase
      .from('liked')
      .delete()
      .eq( 'post_id', post_id)
      .eq('user_id', user_id)

    if(error){
      return { status: 'error', data: null, error }
    }

    return { status: 'success', data: {post_id, user_id}, error: null }
  },

  getLiked: async (): Promise<any> => {
    let { data, error } = await supabase
      .from("liked")
      .select(`*, posts(*, users(name, image))`)
      .order('created_at', {
        ascending: false
      })

    if (error) {
      return { status: 'error', data: null, error }
    }
    if (data) {
      return { status: 'success', data, error: null }
    }

    return { status: 'pending', data: null, error: null }
  },

  getSpecificLiked: async (post_id: IPost['post_id'], user_id: IUser['user_id']): Promise<IResponse<any>> => {
    let { data, error } = await supabase
      .from("liked")
      .select(`*`)
      .eq( 'post_id', post_id)
      .eq('user_id', user_id)

    if (error || (data && !data.length)) {
      return { status: 'error', data: null, error }
    }
    if (data && data.length) {
      return { status: 'success', data, error: null }
    }

    return { status: 'pending', data: null, error: null }
  },
}

export default postService;
