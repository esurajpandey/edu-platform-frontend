import { create } from "zustand";
import { persist } from "zustand/middleware";
import { userService, User, UserDetails } from "@/services/user/user.service";

interface UserState {
  user: User | null;
  fetchMe: () => Promise<UserDetails>;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,

      fetchMe: async () => {
        try {
          const response = await userService.me();

          if (response.success) {
            console.log({ user: response.data });
            set({ user: response.data });
          }

          return response;
        } catch (error) {
          console.error("Failed to fetch user:", error);

          return {
            error: "FETCH_USER_FAILED",
            success: false,
            message: "Failed to fetch user",
            data: null,
          };
        }
      },
    }),
    {
      name: "user-storage",
      partialize: (state) => ({ user: state.user }),
    },
  ),
);
