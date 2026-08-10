import axios from 'axios';
import { env } from '@/config/env';

const api = axios.create({
  baseURL: env.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default api;
