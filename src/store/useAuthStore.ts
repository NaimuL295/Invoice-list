// import { create } from "zustand";

// type User = {
//   id: number;
//   user_name:string
//   email: string;
// };

// type AuthState = {
//   user: User | null;
//   setUser: (user: User | null) => void; //  null allow
// };

// const useAuthStore = create<AuthState>((set) => ({
//   user: null,
//   setUser: (user) => set({ user }),
// }));

// export default useAuthStore;


import { create } from "zustand";

type User = {
  id: number;
  email: string;
  user_name: string;
};

type AuthState = {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
};

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
}));

export default useAuthStore;

