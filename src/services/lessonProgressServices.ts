import { API_ROUTES } from "@/constants/apiRoutes";
import { CreateLessonDto, ExerciceAnswerResult, Exercise, ExerciseWithSign, Lesson, LessonProgress, LessonWithExercises, ProgressStats, UpdateLessonProgressDto, UserLessonWithProgress } from "@/types/LessonInterface";
import { get, post, put } from "./apiClient";

/**
 * Get all lessons with user progress
 */
export const getAllLessonProgress = async (): Promise<UserLessonWithProgress[] | null> => {
    return await get(API_ROUTES.lessonProgress);
}

/**
 * Get user learning statistics
 */
export const getLessonProgressStats = async (): Promise<ProgressStats | null> => {
    return await get(API_ROUTES.lessonProgressStats);
}

/**
 * Get use progress for a specific lesson
 */
export const getLessonProgressById = async (lessonId: string): Promise<LessonProgress | null> => {
    return await get(API_ROUTES.lessonProgressById(lessonId));
}

/**
 * Start a lesson
 */
export const startLessonProgress = async (lessonId: string): Promise<LessonProgress | null> => {
    return await post(API_ROUTES.lessonProgressStart, { lessonId: lessonId });
}

/**
 * Update lesson progress
 */
export const updateLessonProgress = async (lessonId: string, data: UpdateLessonProgressDto): Promise<LessonProgress | null> => {
    return await put(API_ROUTES.lessonProgressUpdate(lessonId), data);
}

/**
 * Complete a lesson
 */
export const completeLessonProgress = async (lessonId: string): Promise<LessonProgress | null> => {
    return await put(API_ROUTES.lessonProgressComplete(lessonId), {});
}

/**
 * Reset lesson progress
 */
export const resetLessonProgress = async (lessonId: string): Promise<LessonProgress | null> => {
    return await post(API_ROUTES.lessonProgressReset(lessonId));
}