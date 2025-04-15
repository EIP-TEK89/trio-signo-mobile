import { Exercise, Lesson, LessonProgress } from "@/types/LessonInterface";
import axios from "axios";

export const getLessons = async (): Promise<Lesson[]>  => {
    try {
        const response = await axios.get(process.env.EXPO_PUBLIC_API_URL + "/lessons")
        return response.data;
    } catch (e) {
        console.error(e.toJSON())
      return [];
    }
};

export const getExerciseFromLesson = async (lessonId: string): Promise<Exercise[]>  => {
    try {
        const response = await axios.get(process.env.EXPO_PUBLIC_API_URL + "/exercises/lesson/" + lessonId)
        return response.data;
    } catch (e) {
        console.error(e.toJSON())
      return [];
    }
}

export const startLesson = async (lessonId: string): Promise<LessonProgress | null>  => {
    try {
        const response = await axios.post(process.env.EXPO_PUBLIC_API_URL + "/lesson-progress/start", { lessonId })
        return response.data;
    } catch (e) {
        console.error(e.toJSON())
        return null;
    }
}

export const updateLesson = async (lessonId: string, currentStep: number, completed: boolean): Promise<LessonProgress | null> => {
    try {
        const response = await axios.put(process.env.EXPO_PUBLIC_API_URL + "/lesson-progress/" + {lessonId} +  "/update", { currentStep, completed })
        return response.data;
    }
    catch (e) {
        console.error(e.toJSON())
        return null;
    }
}

export const completeLesson = async (lessonId: string): Promise<LessonProgress | null> => {
    try {
        const response = await axios.put(process.env.EXPO_PUBLIC_API_URL + "/lesson-progress/" + {lessonId} + "/complete")
        return response.data;
    }
    catch (e) {
        console.error(e.toJSON())
        return null;
    }
}