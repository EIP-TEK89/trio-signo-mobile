import { User } from "./UserInterface";

export interface CreateSignDto {
    word: string;
    definition: string;
    mediaUrl: string;
}

export interface CreateLessonDto {
    title: string;
    description: string;
    level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCE';
    isPublished: boolean;
}

export interface UpdateLessonProgressDto {
    currentStep: number;
    completed: boolean;
}

export interface CreateExerciseDto {
    lessonId: string;
    prompt: string;
    signId: string;
    type: 'WORD_TO_IMAGE' | 'IMAGE_TO_WORD' | 'SIGN_RECOGNITION';
}

export interface UpdateExerciseDto {
    prompt?: string;
    signId?: string;
    type?: 'WORD_TO_IMAGE' | 'IMAGE_TO_WORD' | 'SIGN_RECOGNITION';
}
export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
}

export interface UserLessonWithProgress {
    id: string;
    title: string;
    description: string;
    level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCE';
    isPublished: boolean;
    progress: LessonProgress;
}

export interface ProgressStats {
    completedLessons: number;
    totalLessons: number;
    completionPercentage: number;
    averageScore: number;
    inProgessLessons: number;
}

export interface Sign {
    id: string;
    word: string;
    definition?: string;
    mediaUrl?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Lesson {
    id: string;
    title: string;
    description: string;
    level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCE';
    isPublished: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface LessonProgress {
    id: string;
    userId: string;
    lessonId: string;
    completed: boolean;
    currentStep: number;
    score: number;
    updatedAt: string;
}

export interface LessonWithExercises extends Lesson {
    exercises: Exercise[];
}

export interface Exercise {
    id: string;
    lessonId: string;
    prompt: string;
    signId: string;
    type: 'WORD_TO_IMAGE' | 'IMAGE_TO_WORD' | 'SIGN_RECOGNITION';
}

export interface SubmitExerciseAnswerDto {
    answer: string;
    mutlipleChoice: boolean;
}

export interface ExerciseWithSign extends Exercise {
    sign: Sign;
    options: string[];
}

export interface ExerciceAnswerResult {
    isCorrect: boolean;
    score: number;
    correctAnswer: string;
    exerciseType: 'WORD_TO_IMAGE' | 'IMAGE_TO_WORD' | 'SIGN_RECOGNITION';

} 
