import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LoginPayload } from "@/services/auth/auth.type";
import { authService } from "@/services/auth/auth.service";
import { SuccessResponse, ErrorResponse } from "@/types/api.types";
interface AuthState {
  user: {
    userId: string;
    name: string;
    email: string;
    systemRole: string;
    username: string;
    status: string;
  } | null;
  isAuthenticated: boolean;
  accessToken?: string;
  // Fixed: Added parameter type here
  onLogin: (credentials: LoginPayload) => Promise<SuccessResponse | ErrorResponse>;
  logout: () => Promise<SuccessResponse | ErrorResponse>;
}

// Separate data from actions for cleaner code
const initialData = {
  user: null,
  isAuthenticated: false,
  accessToken: undefined,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...initialData,
      onLogin: async (credentials: LoginPayload) => {
        try {
          const response = await authService.login(credentials);
          set({
            user: response.data.session.user,
            isAuthenticated: true,
            accessToken: response.data.accessToken,
          });
          return response;
        } catch (error) {
          console.error("Login failed:", error);
          return { success: false, message: "Login failed", data: null };
        }
      },
      logout: async () => {
        try {
          const result = await authService.logout();
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
      // Only save these fields to localStorage
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        accessToken: state.accessToken,
      }),
    },
  ),
);
