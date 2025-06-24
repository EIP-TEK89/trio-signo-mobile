import { loginDto, registerDto, UpdateUserDto, User } from '@/types/UserInterface';
import { get, post} from './apiClient';
import { API_ROUTES } from '@constants/apiRoutes';
import * as SecureStore from "expo-secure-store";
import { AuthResponse } from '@/types/LessonInterface';

/**
 * Sign up a new user
 */
export const registerUser = async (userData: registerDto): Promise<AuthResponse> => {
  return await post(API_ROUTES.signUp, userData);
};

/**
 * Log in a user
 */
export const loginUser = async (userData: loginDto): Promise<AuthResponse> => {
  return await post(API_ROUTES.login, userData);
};

/**
 * Refresh tokens
 */
export const refreshToken = async (refreshToken: string): Promise<AuthResponse> => {
  return await post(API_ROUTES.refreshToken, { refreshToken });
};

/**
 * Log out a user
 */
export const logoutUser = async () => {
  try {
    // Call the backend logout endpoint
    await post(API_ROUTES.logout);
  } catch (error) {
    console.error('Logout error:', error);
  }
};