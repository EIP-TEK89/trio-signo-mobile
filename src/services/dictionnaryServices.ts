import { API_ROUTES } from "@/constants/apiRoutes";
import { CreateSignDto, Sign } from "@/types/LessonInterface";
import { del, get, post } from "./apiClient";

/**
 * Create a new sign (admin only)
 */
export const createSign = async (sign: CreateSignDto): Promise<Sign> => {
    return await post(API_ROUTES.signs, sign);
}

/**
 * Delete a sign by ID (admin only)
 */
export const deleteSignById = async (id: string) => {
    return await del(API_ROUTES.signById(id));
}

/**
 * Get all signs
 */
export const getAllSigns = async (): Promise<Sign[]> => {
    return await get(API_ROUTES.signs);
};

/**
 * Search for a sign by name
 */
export const getSignByName = async (name: string): Promise<Sign[]> => {
    return await get(API_ROUTES.searchSignByName(name));
}
