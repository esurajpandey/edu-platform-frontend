import { create } from "zustand";
import axios from "axios";
import { User } from "@/types/user.type";
import { LoginPayload, UserResponse } from "@/services/auth/auth.type";
import { ErrorResponse } from "@/types/api.types";
import authServices from "./auth.services";
import helper from "@/utils/helper";
let accessTokenMemory: string | undefined;
let bootstrapPromise: Promise<boolean> | null = null;

export const getAccessToken = () => accessTokenMemory;
export const setAccessToken = (token?: string) => {
  accessTokenMemory = token;
};

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isBootstrapping: boolean;
  hasBootstrapped: boolean;
  onLogin: (credentials: LoginPayload) => Promise<UserResponse | ErrorResponse>;
  onRefresh: (options?: { silent?: boolean }) => Promise<boolean>;
  bootstrapAuth: () => Promise<boolean>;
  fetchMe: () => Promise<UserResponse | ErrorResponse>;
  clearSession: () => void;
  logout: () => Promise<ErrorResponse | void>;
}

const initialData = {
  user: null,
  isAuthenticated: false,
};

export const useAuthStore = create<AuthState>()((set, get) => ({
  ...initialData,
  isBootstrapping: false,
  hasBootstrapped: false,

  onLogin: async (credentials) => {
    try {
      const response = await authServices.login(credentials);
      const result = helper.successResponse(response, "Login successful");
      setAccessToken(result?.data?.accessToken ?? "");
      const profile = await get().fetchMe();
      if (!profile.success) {
        get().clearSession();
        return profile;
      }
      return profile;
    } catch (error) {
      setAccessToken(undefined);
      set({ ...initialData });
      return helper.errorResponse(error);
    }
  },

  fetchMe: async () => {
    try {
      const response = await authServices.fetchMe();
      const result = helper.successResponse(response, "Profile fetched successfully");
      set({
        user: result?.data?.user,
        isAuthenticated: true,
        hasBootstrapped: true,
      });
      return result;
    } catch (error) {
      console.error("Fetching profile failed:", error);
      setAccessToken(undefined);
      set({ ...initialData });
      return helper.errorResponse(error, "Failed to fetch profile");
    }
  },

  onRefresh: async (options) => {
    try {
      const response = await authServices.refreshToken();
      const result = helper.successResponse(response, "Token refreshed successfully");
      setAccessToken(result?.data?.accessToken);
      set((state) => ({
        user: state.user,
        isAuthenticated: true,
        hasBootstrapped: state.hasBootstrapped,
      }));
      return true;
    } catch (error) {
      const isExpectedRefreshMiss = axios.isAxiosError(error) && error.response?.status === 401;

      if (!options?.silent && !isExpectedRefreshMiss) {
        console.error("Token refresh failed:", error);
      }

      setAccessToken(undefined);
      set({ ...initialData });
      return false;
    }
  },

  bootstrapAuth: async () => {
    if (get().hasBootstrapped) {
      return get().isAuthenticated;
    }

    if (bootstrapPromise) {
      return bootstrapPromise;
    }

    set({ isBootstrapping: true });

    bootstrapPromise = (async () => {
      try {
        if (!getAccessToken()) {
          const didRefresh = await get().onRefresh({ silent: true });
          if (!didRefresh) {
            set({ hasBootstrapped: true });
            return false;
          }
        }

        const profile = await get().fetchMe();
        return profile.success;
      } finally {
        set({ isBootstrapping: false, hasBootstrapped: true });
        bootstrapPromise = null;
      }
    })();

    return bootstrapPromise;
  },

  clearSession: () => {
    setAccessToken(undefined);
    set({ ...initialData, hasBootstrapped: true });
  },

  logout: async () => {
    try {
      await authServices.logout();
    } catch (error) {
      return helper.errorResponse(error, "Logout failed");
    } finally {
      get().clearSession();
    }
  },
}));
