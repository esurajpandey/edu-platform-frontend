import axios, {
  AxiosHeaders,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import { env } from "@/config/env";

type AuthStoreModule = typeof import("@/store/auth/auth.store");

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
  skipAuthRefresh?: boolean;
}

interface RefreshResponse {
  success: boolean;
  accessToken?: string;
  data?: {
    accessToken?: string;
  };
}

const REFRESH_ENDPOINT = "/auth/refresh";

let isConfigured = false;
let refreshPromise: Promise<string | undefined> | null = null;

const getAuthStore = async (): Promise<AuthStoreModule["useAuthStore"] | null> => {
  if (typeof window === "undefined") {
    return null;
  }

  const authStoreModule = await import("@/store/auth/auth.store");
  return authStoreModule.useAuthStore;
};

const getStoredAccessToken = async (): Promise<string | undefined> => {
  const authStore = await getAuthStore();
  return authStore?.getState().accessToken;
};

const setStoredAccessToken = async (accessToken: string | undefined): Promise<void> => {
  const authStore = await getAuthStore();

  if (!authStore) return;

  authStore.setState((state) => ({
    ...state,
    accessToken,
    isAuthenticated: accessToken ? true : state.isAuthenticated,
  }));
};

const clearStoredAuth = async (): Promise<void> => {
  const authStore = await getAuthStore();

  if (!authStore) return;

  authStore.setState((state) => ({
    ...state,
    user: null,
    isAuthenticated: false,
    accessToken: undefined,
  }));
};

const extractAccessToken = (payload: RefreshResponse): string | undefined =>
  payload.data?.accessToken ?? payload.accessToken;

const refreshAccessToken = async (): Promise<string | undefined> => {
  const response = await axios.post<RefreshResponse>(
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

  const accessToken = extractAccessToken(response.data);
  await setStoredAccessToken(accessToken);

  return accessToken;
};

export const setupApiInterceptors = (client: AxiosInstance): void => {
  if (isConfigured) return;

  client.interceptors.request.use(async (config) => {
    const requestConfig = config as RetryableRequestConfig;

    if (requestConfig.skipAuthRefresh || requestConfig.url?.includes(REFRESH_ENDPOINT)) {
      return requestConfig;
    }

    const accessToken = await getStoredAccessToken();

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

  isConfigured = true;
};
