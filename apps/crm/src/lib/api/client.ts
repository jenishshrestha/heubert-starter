import { config } from "@heubert/config";
import axios, { type AxiosError, type AxiosResponse } from "axios";

/**
 * Axios client configured for the NestJS backend
 */
export const apiClient = axios.create({
  baseURL: config.api.baseUrl,
  timeout: config.api.timeout,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding auth tokens
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token from localStorage if it exists
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Redirect to login or refresh token
      localStorage.removeItem("auth_token");
      window.location.href = "/auth/login";
    }

    return Promise.reject(error);
  },
);

// Type-safe API request wrapper
export async function apiRequest<T>(
  method: "get" | "post" | "put" | "patch" | "delete",
  url: string,
  data?: unknown,
): Promise<T> {
  const response = await apiClient.request<T>({
    method,
    url,
    data,
  });
  return response.data;
}
