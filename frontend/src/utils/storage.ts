import { STORAGE_KEYS } from '@/constants/storage';

export const storage = {
  getAccessToken() {
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  },

  setAccessToken(token: string) {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
  },

  removeAccessToken() {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  },

  getRefreshToken() {
    return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  },

  setRefreshToken(token: string) {
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
  },

  removeRefreshToken() {
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  },

  clear() {
    localStorage.clear();
  },
};
