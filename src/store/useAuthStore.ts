import { create } from "zustand";

type User = {
  id: number;
  user_name:string
  email: string;
};

type AuthState = {
  user: User | null;
  setUser: (user: User | null) => void; //  null allow
};

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export default useAuthStore;