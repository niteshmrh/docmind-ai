import api from '@/lib/axios';
import { ApiResponse } from '@/types/api';

import { LoginRequest, RegisterRequest, LoginResult } from '../types/auth.types';

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

  logout(refreshToken: string) {
    return api.post<ApiResponse<null>>('/auth/logout', {
      refreshToken,
    });
  },
};

export default AuthService;
