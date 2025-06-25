import { loginDto, registerDto } from '@/types/UserInterface';
import { post} from './apiClient';
import { API_ROUTES } from '@constants/apiRoutes';
import { AuthResponse } from '@/types/LessonInterface';

/**
 * Sign up a new user
 */
export const registerUser = async (userData: registerDto): Promise<AuthResponse | null> => {
  return await post(API_ROUTES.signUp, userData);
};

/**
 * Log in a user
 */
export const loginUser = async (userData: loginDto): Promise<AuthResponse | null> => {
  return await post(API_ROUTES.login, userData);
};

/**
 * Refresh tokens
 */
export const refreshToken = async (refreshToken: string): Promise<AuthResponse | null> => {
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