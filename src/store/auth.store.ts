import { create } from "zustand";

type AuthState = {
  user: {
    id: number;
    name: string;
    role: string;
  } | null;
  permissions: string[];
  setAuth: (data: any) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  permissions: [],

  setAuth: (data) =>
    set({
      user: data.user,
      permissions: data.permissions,
    }),

  logout: () =>
    set({
      user: null,
      permissions: [],
    }),
}));
