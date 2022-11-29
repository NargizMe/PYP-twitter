import supabase from "../config/supabaseClient.supabase";
import { FormikValues } from "formik";
import { IFollowed, IPost, IResponse, IUser } from "../types/common.type";

const userService = {
  getUsers: async () => {
    const { data, error } = await supabase
      .from("users")
      .select(`*, followed(follower_id)`)

    if (error) {
      return { status: 'error', data: null, error }
    }
    if (data) {
      return { status: 'success', data, error: null }
    }

    return { status: 'pending', data: null, error: null }
  },

  getUser: async (email: string) => {
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq('email', email);

    return { userData: data, userError: error };
  },

  createUser: async (values: FormikValues) => {
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
    });

    return {data, error}
  },

  saveUserToDB: async (values: FormikValues, imageSupa: File | null, id: string) => {
    let fileName;
    if(imageSupa){
      fileName = Date.now().toString() + "-" + imageSupa.name.replaceAll(" ", "");
    }
    const { data, error } = await supabase
      .from("users")
      .insert([{
        email: values.email,
        name: values.fullName,
        image: fileName ? fileName : null,
        user_id: id
      }])
      .select()
      //@ts-ignore
      .eq("email", values.email)

    return { userData: data as IUser[], userError: error }
  },

  uploadImage: async (imageSupa: File | null, imgName:string) => {
    if(imageSupa){
      const { data: imageData, error: imageError } = await supabase.storage
        .from("images")
        .upload("public/" + imgName, imageSupa);

      return { status: 'success', imageData: {path: imageData!.path.slice(7)}, imageError }
    }

    return { status: 'fail', imageData: null, imageError:'imageSupa is null' }
  },

  signin: async(values: FormikValues) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password
    });

    return { data, error }
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();

    return { error };
  },

  saveFollowedtoDB: async (follower_id: IUser['user_id'], followed_id: IUser['user_id']):Promise<IResponse<unknown>> => {
    const { data, error } = await supabase
      .from("followed")
      .insert([{follower_id, followed_id}])

    if(error){
      return { status: 'error', data: null, error }
    }

    return { status: 'success', data: {follower_id, followed_id}, error: null }
  },

  deleteFollowedFromDB: async (follower_id: IUser['user_id'], followed_id: IUser['user_id']):Promise<IResponse<unknown>> => {
    const { data, error } = await supabase
      .from('followed')
      .delete()
      .eq( 'follower_id', follower_id)
      .eq('followed_id', followed_id)

    if(error){
      return { status: 'error', data: null, error }
    }

    return { status: 'success', data: {followed_id, follower_id}, error: null }
  },

  getSpecificFollowed: async (follower_id: IUser['user_id'], followed_id: IUser['user_id']): Promise<IResponse<any>> => {
    let { data, error } = await supabase
      .from("followed")
      .select(`*`)
      .eq( 'follower_id', follower_id)
      .eq('followed_id', followed_id)

    if (error || (data && !data.length)) {
      return { status: 'error', data: null, error }
    }
    if (data && data.length) {
      return { status: 'success', data, error: null }
    }

    return { status: 'pending', data: null, error: null }
  },
}

export default userService;