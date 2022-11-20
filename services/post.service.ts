import supabase from "../config/supabaseClient";
import { IPost, IResponse, IUser } from "../types/common.type";

const postService = {
  getPost: async (): Promise<IResponse<IPost[]>> => {
    let { data, error } = await supabase
      .from("posts")
      .select(`*, users(name, image)`)
      .order('created_at', { ascending: false });

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
}

export default postService;