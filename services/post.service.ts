import supabase from "../config/supabaseClient";
import { IPost, IUser } from "../types/common.type";

const postService = {
  // getUser: async (email: string) => {
  //   const { data, error } = await supabase
  //     .from("users")
  //     .select()
  //     .eq('email', email);
  //
  //   return { userData: data, userError: error };
  // },

  uploadImage: async (tweetImage: File | null) => {
    if(tweetImage){
      const { data: imageData, error: imageError } = await supabase.storage
        .from("images")
        .upload("public/" + tweetImage.name, tweetImage);

      return { status: 'success', imageData, imageError }
    }

    return { status: 'fail', imageData: null, imageError:'tweetImage is null' }
  },

  savePostToDB: async (values: Pick<IPost, "tweet" & "image" & "user_id">) => {
    const { data, error } = await supabase
      .from("posts")
      .insert([values])

    return { userData: values, userError: error }
  },
}

export default postService;