import create from 'zustand';
import { persist } from 'zustand/middleware';
import { cookiePersistStorage } from "../utils/cookie.storage";
// import { mountStoreDevtool } from 'simple-zustand-devtools';

const initialState = {
  id: null,
  email: null,
  name: null,
  role: null,
  image: null,
}

interface IUserState{
  user: {
    id: string | null;
    email: string | null;
    name: string | null;
    role: string | null;
    image: string | null;
  }
  saveUser: (user: IUserState['user']) => void;
  removeUser: () => void;
}

// export const useUserState = create<IUserState>((set) => ({
//   user: initialState,
//   saveUser: (user) => set({ user }),
//   removeUser: () => set({ user: initialState }),
// }))

export const useUserState = create(
  persist<IUserState>(
    (set, get) => ({
      user: initialState,
      saveUser: (user) => set({ user }),
      removeUser: () => set({ user: initialState }),
    }),
    {
      name: 'user-state',
      getStorage: () => cookiePersistStorage,
    }
  )
)

// if (typeof window !== undefined) {
//   mountStoreDevtool('UserState', useUserState);
// }