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
  schools: unknown[];
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

export interface MeResponseData {
  user: User;
}

export type UserResponse = SuccessResponse<MeResponseData>;
export type LoginResponse = SuccessResponse<LoginData>;
export type RefreshTokenResponse = SuccessResponse<RefreshTokenData>;
