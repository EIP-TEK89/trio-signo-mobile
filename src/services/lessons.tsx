import { ExerciceAnswerResult, Exercise, ExerciseWithSign, Lesson, LessonProgress, LessonWithExercises, SubmitExerciseAnswerDto } from "@/types/LessonInterface";
import axios from "axios";

export const getLessonsRequest = async (): Promise<Lesson[]>  => {
    try {
        const response = await axios.get(process.env.EXPO_PUBLIC_API_URL + "/lessons")
        return response.data;
    } catch (e) {
        console.error(e.toJSON())
        return [];
    }
};

export const getLessonRequest = async (lessonId: string): Promise<LessonWithExercises | null> => {
    try {
        const response = await axios.get(process.env.EXPO_PUBLIC_API_URL + "/lessons/" + lessonId)
        return response.data;
    } catch (e) {
        console.error(e.toJSON())
        return null
    }
}

export const getExerciseFromLessonRequest = async (lessonId: string): Promise<Exercise[]>  => {
    try {
        const response = await axios.get(process.env.EXPO_PUBLIC_API_URL + "/exercises/lesson/" + lessonId)
        return response.data;
    } catch (e) {
        console.error(e.toJSON())
        return [];
    }
}

export const getExerciseWithSignRequest = async (exerciseId: string): Promise<ExerciseWithSign | null> => {
    try {
        const response = await axios.get(process.env.EXPO_PUBLIC_API_URL + "/exercises/" + exerciseId)
        return (response.data)
    } catch (e) {
        console.error(e.toJSON())
        return (null)
    }
}

export const CheckExerciseRequest = async (exerciseId: string, answer: string, mutlipleChoice: boolean): Promise<ExerciceAnswerResult | null> => {
    try {
        const response = await axios.post(process.env.EXPO_PUBLIC_API_URL + "/exercises/" + exerciseId + "/check", {answer, mutlipleChoice})
        return (response.data)
    } catch (e) {
        console.error(e.toJSON())
        return (null)
    }
}

export const startLessonRequest = async (lessonId: string): Promise<LessonProgress | null>  => {
    try {
        const response = await axios.post(process.env.EXPO_PUBLIC_API_URL + "/lesson-progress/start", { lessonId })
        return response.data;
    } catch (e) {
        console.error(e.toJSON())
        return null;
    }
}

export const updateLessonRequest = async (lessonId: string, currentStep: number, completed: boolean): Promise<LessonProgress | null> => {
    try {
        const response = await axios.put(process.env.EXPO_PUBLIC_API_URL + "/lesson-progress/" + {lessonId} +  "/update", { currentStep, completed })
        return response.data;
    }
    catch (e) {
        console.error(e.toJSON())
        return null;
    }
}

export const completeLessonRequest = async (lessonId: string): Promise<LessonProgress | null> => {
    try {
        const response = await axios.put(process.env.EXPO_PUBLIC_API_URL + "/lesson-progress/" + {lessonId} + "/complete")
        return response.data;
    }
    catch (e) {
        console.error(e.toJSON())
        return null;
    }
}