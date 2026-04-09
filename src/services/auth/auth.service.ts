import { apiClient } from "@/lib/api-client";
import { LoginPayload, LoginResponse, RefreshTokenResponse, UserResponse } from "./auth.type";
import { SuccessResponse, ErrorResponse } from "@/types/api.types";

export const authService = {
  /**
   * Sends credentials to the server.
   * Server responds with a Set-Cookie header for the session/access token.
   */
  login: async (credentials: LoginPayload): Promise<LoginResponse> => {
    // 1. Axios returns AxiosResponse<LoginResponse>
    const response = await apiClient.post<LoginResponse>("/auth/login", credentials);
    // 2. We return response.data, which IS LoginResponse (SuccessResponse<LoginData>)
    return response.data;
  },

  /**
   * Fetches the current authenticated user profile.
   */
  getMe: async (): Promise<UserResponse> => {
    const response = await apiClient.get<UserResponse>("/auth/me");
    return response.data;
  },

  /**
   * Triggers a token refresh.
   * Usually called by an Axios interceptor when a 401 is detected.
   */
  refreshToken: async (): Promise<RefreshTokenResponse> => {
    const response = await apiClient.post<RefreshTokenResponse>("/auth/refresh");
    return response.data;
  },

  /**
   * Clears the session on the server and local state.
   */
  logout: async (): Promise<SuccessResponse | ErrorResponse> => {
    return apiClient.post("/auth/logout");
  },
};
