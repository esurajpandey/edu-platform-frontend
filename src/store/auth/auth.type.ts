import { User } from "@/types/user.type";
import { SuccessResponse } from "@/types/api.types";
export interface LoginPayload {
  loginId: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    accessToken: string;
  };
}
export interface RefreshTokenData {
  accessToken: string;
}
export type FetchUserResponse = SuccessResponse<{ user: User }>;
export type RefreshTokenResponse = SuccessResponse<RefreshTokenData>;
