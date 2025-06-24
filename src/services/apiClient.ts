import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { API_ROUTES, API_URL} from '@constants/apiRoutes';
import * as SecureStore from "expo-secure-store";
import { router } from 'expo-router';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_URL, // Base URL from environment
  timeout: 10000, // Request timeout
});

// Store for keeping track of refresh token requests
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

// Subscribe to token refresh
const subscribeTokenRefresh = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

// Execute all registered callbacks with new token
const onTokenRefreshed = (newToken: string) => {
  refreshSubscribers.forEach((callback) => callback(newToken));
  refreshSubscribers = [];
};

// Add token to request headers
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await SecureStore.getItemAsync('token');

    // Skip auth header for login/register/refresh routes
    const isAuthRoute = ['/auth/login', '/auth/register', '/auth/refresh'].some((route) =>
      config.url?.includes(route),
    );

    if (token && !isAuthRoute) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`};
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Handle 401 errors and token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    // Handle 401 Unauthorized errors that aren't from token refresh endpoint
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/auth/refresh')
    ) {
      // If already refreshing, add request to queue
      if (isRefreshing) {
        return new Promise<AxiosResponse>((resolve) => {
          subscribeTokenRefresh((token: string) => {
            // Replace old token with new token
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            resolve(axios(originalRequest));
          });
        });
      }

      // Mark that refresh is in progress
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Get refresh token from storage
        const refreshToken = await SecureStore.getItemAsync('refreshToken');

        if (!refreshToken) {
            // No refresh token available, logout
            await SecureStore.deleteItemAsync('token');
            await SecureStore.deleteItemAsync('refreshToken');
            await SecureStore.deleteItemAsync('user');
            router.replace("/login")
            return Promise.reject(error);
        }

        // Attempt to refresh the token
        const response = await axios.post(
          API_ROUTES.refreshToken,
          { refreshToken },
          {
            headers: { 'Content-Type': 'application/json' },
            baseURL: '', // Avoid using instance's baseURL to prevent auth header
          },
        );

        // Store the new tokens
        const { accessToken, refreshToken: newRefreshToken } = response.data;
        await SecureStore.setItemAsync('token', accessToken);
        await SecureStore.setItemAsync('refreshToken', newRefreshToken);

        apiClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        // Update auth header for original request
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }

        // Notify subscribers that token is refreshed
        onTokenRefreshed(accessToken);

        isRefreshing = false;

        // Retry original request with new token
        return axios(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;

        // If refresh failed, logout
        await SecureStore.deleteItemAsync('token');
        await SecureStore.deleteItemAsync('refreshToken');
        await SecureStore.deleteItemAsync('user');

        // Navigate to login page
        router.replace("/login");
        return Promise.reject(refreshError);
      }
    }

    // For other errors, just reject
    return Promise.reject(error);
  },
);

// Error handling
const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 401) {
      // Handle 401 for specific API calls if needed
      console.error('Authentication error:', error.response?.data?.message || 'Authentication failed');
    } else if (error.response?.status === 403) {
      console.error('Authorization error:', error.response?.data?.message || 'Not authorized');
    } else {
      console.error('API error:', error.response?.data?.message || error.message);
    }

    throw new Error(error.response?.data?.message || 'An error occurred');
  } else {
    console.error('Unknown error:', error);
    throw new Error('Unknown error');
  }
};

// API methods
export const get = async (url: string, params = {}, config = {}) => {
  try {
    const response = await apiClient.get(url, { params, ...config });
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const post = async (url: string, data?: any, config = {}) => {
  try {
    const response = await apiClient.post(url, data, config);
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const del = async (url: string, config = {}) => {
  try {
    const response = await apiClient.delete(url, config);
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const put = async (url: string, data: any, config = {}) => {
  try {
    const response = await apiClient.put(url, data, config);
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const patch = async (url: string, data: any, config = {}) => {
  try {
    const response = await apiClient.patch(url, data, config);
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export default apiClient;
