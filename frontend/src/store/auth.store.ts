import { User } from '@/features/auth/types/auth.types';

let currentUser: User | null = null;

export const authStore = {
  getUser() {
    return currentUser;
  },

  setUser(user: User) {
    currentUser = user;
  },

  clear() {
    currentUser = null;
  },
};
