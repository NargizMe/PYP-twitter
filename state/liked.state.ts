import create from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { ILiked, IResponse } from "../types/common.type";

export interface ILikedState {
  payload: 'tweet' | 'liked' | 'retweet';
  setPayload: (payload: ILikedState["payload"]) => void;
}

export const useLikedState = create<ILikedState>((set, get) => ({
  payload: 'tweet',
  setPayload: (payload) => {
    set({ payload });
  },
}));

if (typeof window !== undefined) {
  mountStoreDevtool("LikedState", useLikedState);
}