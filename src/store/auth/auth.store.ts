import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LoginPayload, User, UserResponse } from "@/services/auth/auth.type";
import { authService } from "@/services/auth/auth.service";
import { SuccessResponse, ErrorResponse } from "@/types/api.types";

let accessTokenMemory: string | undefined;

export const getAccessToken = (): string | undefined => accessTokenMemory;
export const setAccessToken = (token?: string): void => {
  accessTokenMemory = token;
};

const clearAccessToken = (): void => {
  accessTokenMemory = undefined;
};

interface FetchMeErrorResponse {
  error: string;
  message: string;
  success: false;
  data: null;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  onLogin: (credentials: LoginPayload) => Promise<SuccessResponse | ErrorResponse>;
  fetchMe: () => Promise<UserResponse | FetchMeErrorResponse>;
  logout: () => Promise<SuccessResponse | ErrorResponse>;
}

const initialData = {
  user: null,
  isAuthenticated: false,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...initialData,
      onLogin: async (credentials: LoginPayload) => {
        try {
          const response = await authService.login(credentials);
          setAccessToken(response.data.accessToken);
          set({
            user: response.data.session.user,
            isAuthenticated: true,
          });
          return response;
        } catch (error) {
          console.error("Login failed:", error);
          clearAccessToken();
          return { success: false, message: "Login failed", data: null };
        }
      },
      fetchMe: async () => {
        try {
          const response = await authService.getMe();
          set({
            user: response.data,
            isAuthenticated: true,
          });
          return response;
        } catch (error) {
          console.error("Fetching profile failed:", error);
          set({ ...initialData });
          return {
            success: false,
            message: "Failed to fetch user",
            error: "FETCH_ME_FAILED",
            data: null,
          };
        }
      },
      logout: async () => {
        try {
          const result = await authService.logout();
          clearAccessToken();
          set({ ...initialData });
          return result;
        } catch (error) {
          console.error("Logout failed:", error);
          return { success: false, message: "Logout failed", data: null };
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
