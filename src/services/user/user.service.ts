import axios from "axios";
import { apiClient } from "@/lib/api-client";
import { SuccessResponse } from "@/types/api.types";

export interface User {
  userId: string;
  name: string;
  email: string;
  systemRole: string;
  username: string;
  status: string;
}

export interface UserErrorResponse {
  error: string;
  message: string;
  success: false;
  data: null;
}

export type UserDetails = SuccessResponse<User> | UserErrorResponse;

export const userService = {
  me: async (): Promise<UserDetails> => {
    try {
      const response = await apiClient.get<SuccessResponse<User>>("/auth/me");
      return response.data;
    } catch (error: unknown) {
      const apiError = axios.isAxiosError<{ error?: string; message?: string }>(error)
        ? error.response?.data
        : null;

      return {
        error: apiError?.error || "FETCH_USER_FAILED",
        success: false,
        message: apiError?.message || "Failed to fetch user",
        data: null,
      };
    }
  },
};
