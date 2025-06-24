/**
 * API route definitions
 *
 * This file contains all API endpoint routes used in the application.
 * Update these to match your backend API structure.
 */

import { getAllLessonsForAdmin } from "@/services/lessonsServices";

export const API_URL: string = process.env.EXPO_PUBLIC_API_URL;

export const API_ROUTES = {
  // Auth endpoints
  signUp: API_URL + '/api/auth/register',
  login: API_URL + '/api/auth/login',
  logout: API_URL + '/api/auth/logout',
  refreshToken: API_URL + '/api/auth/refresh',
  currentUser: API_URL + '/api/auth/me',

  // User management
  users: API_URL + '/api/users',
  userById: (id: string) => API_URL + `/api/user/${id}`,

  // OAuth routes
  googleAuth: API_URL + '/api/auth/google',
  googleAuthRedirect: API_URL + '/api/auth/google/callback',

  // Dictionary endpoints
  signs: API_URL + '/api/signs',
  searchSignByName: (name: string) => API_URL + `/api/signs/search/${name}`,
  signById: (id: string) => API_URL + `/api/signs/${id}`,

  // Lesson endpoints
  lessons: API_URL + '/api/lessons',
  lessonById: (id: string) => API_URL + `/api/lessons/${id}`,
  lessonsForAdmin: API_URL + '/api/lessons/admin/all',
  lessonByIdForAdmin: (id: string) => API_URL + `/api/lessons/admin/${id}`,

  // Lesson progress endpoints
  lessonProgress: API_URL + '/api/lesson-progress',
  lessonProgressStats: API_URL + '/api/lesson-progress/stats',
  lessonProgressById: (lessonId: string) => API_URL + `/api/lesson-progress/${lessonId}`,
  lessonProgressStart: API_URL + '/api/lesson-progress/start',
  lessonProgressUpdate: (lessonId: string) => API_URL + `/api/lesson-progress/${lessonId}/update`,
  lessonProgressComplete: (lessonId: string) => API_URL + `/api/lesson-progress/${lessonId}/complete`,
  lessonProgressReset: (lessonId: string) => API_URL + `/api/lesson-progress/${lessonId}/reset`,

  // Exercise endpoints
  exercises: API_URL + '/api/exercises',
  allExercicesForSpecificLesson: (lessonId: string) => API_URL + `/api/exercises/lesson/${lessonId}`,
  exerciseById: (id: string) => API_URL + `/api/exercises/${id}`,
  exerciseCheck: (id: string) => API_URL + `/api/exercises/${id}/check`,
};