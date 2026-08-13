import type { JwtPayload as BaseJwtPayload } from "jsonwebtoken";

export interface JwtPayload extends BaseJwtPayload {
  id: string;
  email: string;
  role: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RegisterResponse {
  id: string;
  name: string;
  email: string;
}