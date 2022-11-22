import supabase from "../config/supabaseClient";
import { IPost, IResponse, IUser } from "../types/common.type";

const postService = {
  getPost: async (from: number = 0, to: number = 2): Promise<IResponse<IPost[]>> => {
    let { data, error } = await supabase
      .from("posts")
      .select(`*, users(name, image), comments(*, users(name, image))`)
      .order('created_at', {
        foreignTable: 'comments',
        ascending: false
      })
      .order('created_at', {
        ascending: false
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

  updatePost: async (name: IPost['retweet_count' | 'save_count'], count: number, id: IPost['post_id']) => {
    let { data, error } = await supabase
      .from(`${name}`)
      .update({ name:  count})
      .eq('post_id', id )
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
}

export default postService;
