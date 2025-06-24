import { API_ROUTES } from "@/constants/apiRoutes";
import { CreateLessonDto, ExerciceAnswerResult, Exercise, ExerciseWithSign, Lesson, LessonProgress, LessonWithExercises } from "@/types/LessonInterface";
import { del, get, post, put } from "./apiClient";

/**
 * Get all Published Lessons 
 */
export const getAllLessons = async (): Promise<Lesson[] | null> => {
    return await get(API_ROUTES.lessons);
}

/**
 * Create a new lesson (admin only)
 */
export const createNewLessonForAdmin = async (lesson: CreateLessonDto): Promise<Lesson | null> => {
    return await post(API_ROUTES.lessons, lesson);   
}

/**
 * Get a lesson by ID
 */
export const getLessonById = async (id: string): Promise<LessonWithExercises | null>=> {
    return await get(API_ROUTES.lessonById(id));
}

/**
 * Update a lesson by ID (admin only)
 */
export const updateLessonByIdForAdmin = async (id: string, lesson: CreateLessonDto): Promise<Lesson | null> => {
    return await put(API_ROUTES.lessonById(id), lesson);
}

/**
 * Delete a lesson by ID (admin only)
 */
export const deleteLessonByIdForAdmin = async (id: string): Promise<Lesson | null> => {
    return await del(API_ROUTES.lessonById(id));
}

/**
 * Get all Lessons (admin only)
 */
export const getAllLessonsForAdmin = async (): Promise<Lesson[] | null> => {
    return await get(API_ROUTES.lessonsForAdmin);
}

/**
 * Get a lesson by ID (admin only)
 */
export const getLessonByIdForAdmin = async (id: string): Promise<LessonWithExercises | null> => {
    return await get(API_ROUTES.lessonByIdForAdmin(id));
}