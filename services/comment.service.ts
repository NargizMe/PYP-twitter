import supabase from "../config/supabaseClient.supabase";
import { IComment, IPost, IResponse, IUser } from "../types/common.type";

const commentService = {
  getComments: async (): Promise<IResponse<IComment[]>> => {
    let { data, error } = await supabase
      .from("comments")
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

  getCommentsByPostId: async (from:number, to:number, post_id:IPost['post_id']): Promise<IResponse<IComment[]>> => {
    let { data, error } = await supabase
      .from("comments")
      .select(`*, users(name, image)`)
      .eq('post_id', post_id)
      .order('created_at', { ascending: false })
      .range(from, to)

    if (error) {
      return { status: 'error', data: null, error }
    }
    if (data) {
      return { status: 'success', data, error: null }
    }

    return { status: 'pending', data: null, error: null }
  },

  saveCommentToDB: async (values: Pick<IComment, "comment" & "comment_id" & "user_id" & "post_id">):Promise<IResponse<unknown>> => {
    const { data, error } = await supabase
      .from("comments")
      .insert([values])

    if(error){
      return { status: 'error', data: null, error }
    }

    return { status: 'success', data: values, error: null }
  },
}

export default commentService;