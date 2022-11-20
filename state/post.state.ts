import create from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { IPost, IResponse } from "../types/common.type";

interface IPostState {
  payload: IResponse<IPost[]>;
  setPayload: (payload: IPostState["payload"]) => void;
}

export const usePostState = create<IPostState>((set, get) => ({
  payload: { status: "pending", data: null, error: null },
  setPayload: (payload) => {
    set({ payload });
  }
}));

if (typeof window !== undefined) {
  mountStoreDevtool("PostState", usePostState);
}