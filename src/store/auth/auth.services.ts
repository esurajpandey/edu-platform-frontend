import { apiClient } from '@/lib/api-client';
import { LoginResponse, LoginPayload, FetchUserResponse, RefreshTokenResponse } from './auth.type';
import { ErrorResponse, SuccessResponse } from '@/types/api.types';
const authService = {
  login: async (credentials: LoginPayload) =>
    await apiClient.post<LoginResponse>('/auth/login', credentials),
  logout: async () => await apiClient.post<SuccessResponse | ErrorResponse>('/auth/logout'),
  fetchMe: async () => await apiClient.get<FetchUserResponse | ErrorResponse>('/auth/me'),
  refreshToken: async () =>
    await apiClient.post<RefreshTokenResponse | ErrorResponse>('/auth/refresh', {}),
};

export default authService;
