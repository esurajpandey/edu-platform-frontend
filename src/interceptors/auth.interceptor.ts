import { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { getAccessToken, useAuthStore } from "@/store/auth/auth.store";
import { APP_ROUTES } from "@/constants/app-routes";
interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}
let refreshPromise: Promise<string | undefined> | null = null;

const isAuthRoute = (url?: string) => {
  if (!url) {
    return false;
  }
  return (
    url.includes("/auth/login") || url.includes("/auth/refresh") || url.includes("/auth/logout")
  );
};

export const setupApiInterceptors = (client: AxiosInstance): void => {
  client.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config as RetryableRequestConfig;

      if (
        error.response?.status === 401 &&
        !originalRequest?._retry &&
        !isAuthRoute(originalRequest?.url)
      ) {
        originalRequest._retry = true;

        try {
          if (!refreshPromise) {
            refreshPromise = useAuthStore
              .getState()
              .onRefresh()
              .then(() => getAccessToken());
          }

          const newToken = await refreshPromise;
          refreshPromise = null;

          if (newToken) {
            originalRequest.headers = originalRequest.headers ?? {};
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return client(originalRequest);
          }
        } catch (refreshError) {
          refreshPromise = null;
          useAuthStore.getState().clearSession();
          if (typeof window !== "undefined") {
            window.location.replace(APP_ROUTES.login);
          }
          return Promise.reject(refreshError);
        }
      }

      if (error.response?.status === 401 && isAuthRoute(originalRequest?.url)) {
        useAuthStore.getState().clearSession();
      }

      return Promise.reject(error);
    },
  );
};
