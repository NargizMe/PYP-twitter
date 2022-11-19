import supabase from "../../config/supabaseClient";
import { useEffect, useState } from "react";

export default function useGetAllPosts() {
  const [state, setState] = useState<any>({ status: 'pending', data: null })

  async function getPosts() {
    let { data, error } = await supabase
      .from("posts")
      .select(`*, users(name)`);

    if (error) {
      setState({
        status: "error",
        data: error
      })
    }
    if (data) {
      setState({
        status: "success",
        data: data
      })
    }
  }

  useEffect(() => {
    getPosts()
  }, [])

  return state;

}