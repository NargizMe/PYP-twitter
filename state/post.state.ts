import create from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { IPost, IResponse } from "../types/common.type";

interface IPostState {
  payload: IResponse<IPost[]>;
  setPayload: (payload: IPostState["payload"]) => void;
  pushPayload: (payload: IPostState["payload"]) => void;
  pushSinglePayload: (payload: IPost) => void;
}

export const usePostState = create<IPostState>((set, get) => ({
  payload: { status: "pending", data: null, error: null },
  setPayload: (payload) => {
    set({ payload });
  },
  pushPayload: (payload) => {
    const newList = [...get().payload.data!, ...payload.data!]
    set({ payload: { ...payload, data: newList } })
  },
  pushSinglePayload: (payload) => {
    const list = get().payload;
    if(Array.isArray(list.data)){
      set({ payload: { ...list, data: [payload, ...list.data] } })
    }
    else{
      set({ payload: { ...list, data: [payload] } })
    }
  }
}));

if (typeof window !== undefined) {
  mountStoreDevtool("PostState", usePostState);
}