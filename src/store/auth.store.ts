import { create } from "zustand";

type AuthUser = {
  id: number;
  name: string;
  role: string;
};

type AuthPayload = {
  user: AuthUser | null;
  permissions: string[];
};

type AuthState = {
  user: AuthUser | null;
  permissions: string[];
  setAuth: (data: AuthPayload) => void;
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
