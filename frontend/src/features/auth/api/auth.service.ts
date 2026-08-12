import api from '@/lib/axios';
import { ApiResponse } from '@/types/api';

import {
  LoginRequest,
  RegisterRequest,
  LoginResult,
  UpdateProfileRequest,
  ChangePasswordRequest,
  AuthUser,
} from '../types/auth.types';

const AuthService = {
  login(data: LoginRequest) {
    return api.post<ApiResponse<LoginResult>>('/auth/login', data);
  },

  register(data: RegisterRequest) {
    return api.post<ApiResponse<LoginResult>>('/auth/register', data);
  },

  refreshToken(refreshToken: string) {
    return api.post<ApiResponse<LoginResult>>('/auth/refresh-token', {
      refreshToken,
    });
  },

  me() {
    return api.get<ApiResponse<AuthUser>>('/auth/me');
  },

  updateProfile(data: UpdateProfileRequest) {
    return api.patch<ApiResponse<AuthUser>>('/auth/profile', data);
  },

  changePassword(data: ChangePasswordRequest) {
    return api.patch<ApiResponse<null>>('/auth/change-password', data);
  },

  logout(refreshToken: string) {
    return api.post<ApiResponse<null>>('/auth/logout', {
      refreshToken,
    });
  },
};

export default AuthService;
