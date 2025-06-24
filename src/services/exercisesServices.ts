import { API_ROUTES } from "@/constants/apiRoutes";
import { CreateExerciseDto, ExerciceAnswerResult, Exercise, ExerciseWithSign, SubmitExerciseAnswerDto, UpdateExerciseDto } from "@/types/LessonInterface";
import { del, get, post, put } from "./apiClient";

/**
 * Get all exercises (admin only)
 */
export const getAllExercisesForAdmin = async (): Promise<Exercise[] | null> => {
    return await get(API_ROUTES.exercises);
}

/**
 * Create new exercise (admin only)
 */
export const createNewExerciseForAdmin = async (exercise: CreateExerciseDto): Promise<Exercise | null> => {
    return await post(API_ROUTES.exercises, exercise);
}

/**
 * Get all exercises for a specific lesson
 */
export const getExercisesForSpecificLesson = async (lessonId: string): Promise<Exercise[] | null> => {
    return await get(API_ROUTES.allExercicesForSpecificLesson(lessonId));
}

/**
 * Get an exercise by ID
 */
export const getExerciseById = async (id: string): Promise<ExerciseWithSign | null> => {
    return await get(API_ROUTES.exerciseById(id));
}

/**
 * Update an exercise (admin only)
 */
export const updateExerciceForAdmin = async (id: string, exercise: UpdateExerciseDto): Promise<Exercise | null> => {
    return await put(API_ROUTES.exerciseById(id), exercise);
}

/**
 * Delete an exercise (admin only)
 */
export const deleteExerciseForAdmin = async (id: string): Promise<Exercise | null> => {
    return await del(API_ROUTES.exerciseById(id));
}

/**
 * Check an exercise answer and update user progress
 */
export const checkExercise = async (id: string, exercise: SubmitExerciseAnswerDto): Promise<ExerciceAnswerResult> => {
    return await post(API_ROUTES.exerciseCheck(id), exercise);
}
