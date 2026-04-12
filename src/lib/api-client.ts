import axios from 'axios';
import { env } from '@/config/env';
import { setupApiInterceptors } from '@/interceptors';

export const apiClient = axios.create({
  baseURL: env.NEXT_PUBLIC_API_BASE_URL,
  timeout: env.NEXT_PUBLIC_API_TIMEOUT_MS,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

setupApiInterceptors(apiClient);
