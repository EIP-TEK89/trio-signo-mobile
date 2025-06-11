<<<<<<< HEAD
import { ExerciceAnswerResult, Exercise, ExerciseWithSign, Lesson, LessonProgress, LessonWithExercises, SubmitExerciseAnswerDto } from "@/types/LessonInterface";
import axios from "axios";

export const getLessonsRequest = async (): Promise<Lesson[]>  => {
=======
import { Exercise, Lesson, LessonProgress } from "@/types/LessonInterface";
import axios from "axios";

export const getLessons = async (): Promise<Lesson[]>  => {
>>>>>>> 89fc775 (feat: add new components and assets for lesson exercises)
    try {
        const response = await axios.get(process.env.EXPO_PUBLIC_API_URL + "/lessons")
        return response.data;
    } catch (e) {
        console.error(e.toJSON())
<<<<<<< HEAD
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
=======
      return [];
    }
};

export const getExerciseFromLesson = async (lessonId: string): Promise<Exercise[]>  => {
>>>>>>> 89fc775 (feat: add new components and assets for lesson exercises)
    try {
        const response = await axios.get(process.env.EXPO_PUBLIC_API_URL + "/exercises/lesson/" + lessonId)
        return response.data;
    } catch (e) {
        console.error(e.toJSON())
<<<<<<< HEAD
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
=======
      return [];
    }
}

export const startLesson = async (lessonId: string): Promise<LessonProgress | null>  => {
>>>>>>> 89fc775 (feat: add new components and assets for lesson exercises)
    try {
        const response = await axios.post(process.env.EXPO_PUBLIC_API_URL + "/lesson-progress/start", { lessonId })
        return response.data;
    } catch (e) {
        console.error(e.toJSON())
        return null;
    }
}

<<<<<<< HEAD
export const updateLessonRequest = async (lessonId: string, currentStep: number, completed: boolean): Promise<LessonProgress | null> => {
    try {
        const response = await axios.put(process.env.EXPO_PUBLIC_API_URL + "/lesson-progress/" + lessonId +  "/update", { currentStep, completed })
=======
export const updateLesson = async (lessonId: string, currentStep: number, completed: boolean): Promise<LessonProgress | null> => {
    try {
        const response = await axios.put(process.env.EXPO_PUBLIC_API_URL + "/lesson-progress/" + {lessonId} +  "/update", { currentStep, completed })
>>>>>>> 89fc775 (feat: add new components and assets for lesson exercises)
        return response.data;
    }
    catch (e) {
        console.error(e.toJSON())
        return null;
    }
}

<<<<<<< HEAD
export const completeLessonRequest = async (lessonId: string): Promise<LessonProgress | null> => {
    try {
        const response = await axios.put(process.env.EXPO_PUBLIC_API_URL + "/lesson-progress/" + lessonId + "/complete")
        return response.data;
    }
    catch (e) {
        console.error(e.toJSON())
        return null;
    }
}

export const resetLessonRequest = async (lessonId: string): Promise<LessonProgress | null> => {
    try {
        const response = await axios.post(process.env.EXPO_PUBLIC_API_URL + "/lesson-progress/" + lessonId + "/reset")
=======
export const completeLesson = async (lessonId: string): Promise<LessonProgress | null> => {
    try {
        const response = await axios.put(process.env.EXPO_PUBLIC_API_URL + "/lesson-progress/" + {lessonId} + "/complete")
>>>>>>> 89fc775 (feat: add new components and assets for lesson exercises)
        return response.data;
    }
    catch (e) {
        console.error(e.toJSON())
        return null;
    }
}