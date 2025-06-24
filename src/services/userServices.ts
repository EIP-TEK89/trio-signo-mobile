import { PaginatedResponse, registerDto, UpdateUserDto, User} from '@/types/UserInterface';
import { get, post, del, patch } from './apiClient';
import { API_ROUTES } from '@constants/apiRoutes';

/**
 * Create a new user (admin only)
 */
export const createNewUserForAdmin = async (userData: registerDto): Promise<User | null> => {
  return await post(API_ROUTES.users, userData);
}

/**
 * Fetch all users (admin only)
 */
export const getAllUsersForAdmin = async (): Promise<PaginatedResponse<User> | null> => {
  return await get(API_ROUTES.users);
};

/**
 * Fetch user by ID (admin only)
 */
export const getUserByIdForAdmin = async (id: string): Promise<User | null> => {
  return await get(API_ROUTES.userById(id));
};

/**
 * Update user by ID (admin only)
 */
export const updateUserByIdForAdmin = async (id: string, data: UpdateUserDto): Promise<User | null> => {
  return await patch(API_ROUTES.userById(id), data);
}

/**
 * Delete user by ID (admin only)
 */
export const deleteUserByIdForAdmin = async (id: string) => {
  return await del(API_ROUTES.userById(id));
}

/**
 * Get current user profile
 */
export const getCurrentUser = async (): Promise<User | null> => {
  return await get(API_ROUTES.currentUser);
};


/**
 * Update user profile
 */
export const updateCurrentUser = async (data: UpdateUserDto): Promise<User | null> => {
  return await patch(API_ROUTES.currentUser, data);
};

/**
 * Delete user account
 */
export const deleteCurrentUser = async () => {
  return await del(API_ROUTES.currentUser);
};
