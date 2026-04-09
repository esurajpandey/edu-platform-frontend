import { SuccessResponse } from "@/types/api.types";

export interface LoginPayload {
  loginId: string;
  password: string;
}

export interface User {
  userId: string;
  name: string;
  email: string;
  systemRole: string;
  username: string;
  status: string;
}
export interface LoginData {
  session: {
    user: User;
  };
  accessToken: string;
}

export interface RefreshTokenData {
  accessToken: string;
}

export type UserResponse = SuccessResponse<User>;
export type LoginResponse = SuccessResponse<LoginData>;
export type RefreshTokenResponse = SuccessResponse<RefreshTokenData>;
