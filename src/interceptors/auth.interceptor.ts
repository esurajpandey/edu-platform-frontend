import axios, { AxiosHeaders, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { env } from "@/config/env";
import { getAccessToken, setAccessToken, useAuthStore } from "@/store/auth/auth.store";
import { RefreshTokenResponse } from "@/services/auth/auth.type";

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
  skipAuthRefresh?: boolean;
}

const REFRESH_ENDPOINT = "/auth/refresh";
const configuredClients = new WeakSet<AxiosInstance>();
let refreshPromise: Promise<string | undefined> | null = null;

const setStoredAccessToken = async (accessToken: string | undefined): Promise<void> => {
  setAccessToken(accessToken);
  useAuthStore.setState((state) => ({
    ...state,
    isAuthenticated: accessToken ? true : state.isAuthenticated,
  }));
};

const clearStoredAuth = async (): Promise<void> => {
  setAccessToken(undefined);
  useAuthStore.setState((state) => ({
    ...state,
    user: null,
    isAuthenticated: false,
  }));
};

const refreshAccessToken = async (): Promise<string | undefined> => {
  const response = await axios.post<RefreshTokenResponse>(
    `${env.NEXT_PUBLIC_API_BASE_URL}${REFRESH_ENDPOINT}`,
    {},
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  );

  const accessToken = response.data.data.accessToken;
  await setStoredAccessToken(accessToken);

  return accessToken;
};

export const setupApiInterceptors = (client: AxiosInstance): void => {
  if (configuredClients.has(client)) return;

  client.interceptors.request.use(async (config) => {
    const requestConfig = config as RetryableRequestConfig;

    if (requestConfig.skipAuthRefresh || requestConfig.url?.includes(REFRESH_ENDPOINT)) {
      return requestConfig;
    }

    const accessToken = getAccessToken();

    if (!accessToken) {
      return requestConfig;
    }

    const headers = AxiosHeaders.from(requestConfig.headers);
    headers.set("Authorization", `Bearer ${accessToken}`);
    requestConfig.headers = headers;

    return requestConfig;
  });

  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config as RetryableRequestConfig | undefined;
      const status = error.response?.status;
      const requestUrl = originalRequest?.url ?? "";

      if (
        !originalRequest ||
        originalRequest._retry ||
        originalRequest.skipAuthRefresh ||
        status !== 401 ||
        requestUrl.includes(REFRESH_ENDPOINT) ||
        requestUrl.includes("/auth/login") ||
        requestUrl.includes("/auth/logout")
      ) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        refreshPromise ??= refreshAccessToken().finally(() => {
          refreshPromise = null;
        });

        const newAccessToken = await refreshPromise;
        const headers = AxiosHeaders.from(originalRequest.headers);

        if (newAccessToken) {
          headers.set("Authorization", `Bearer ${newAccessToken}`);
        } else {
          headers.delete("Authorization");
        }

        originalRequest.headers = headers;

        return client(originalRequest);
      } catch (refreshError) {
        await clearStoredAuth();
        return Promise.reject(refreshError);
      }
    },
  );

  configuredClients.add(client);
};
