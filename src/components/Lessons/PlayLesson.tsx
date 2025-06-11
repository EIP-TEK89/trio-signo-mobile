import { useEffect, useState } from "react";
import AppView from "../Ui/AppView";
import { Text, TouchableOpacity } from "react-native";
import Title from "../Title";
import { completeLessonRequest, getExerciseFromLessonRequest, resetLessonRequest, startLessonRequest, updateLessonRequest } from "@/services/lessons";
import { Exercise, LessonProgress, LessonWithExercises } from "@/types/LessonInterface";
import { router } from "expo-router";
import PlayExercise from "./Exercises/PlayExercise";
import ProgressBar from "./ProgressBar";

interface PlayLessonProps {
  lesson: LessonWithExercises;
  onComplete: (lessonResult: LessonProgress) => void;
}

const PlayLesson: React.FC<PlayLessonProps> = ({lesson, onComplete}) => {
    const [loading, setLoading] = useState(true);
    const [lessonProgress, setLessonProgress] = useState<LessonProgress>();
    const [exercisesList, setExercisesList] = useState<Exercise[]>(lesson.exercises);
    const [index, setIndex] = useState<number>(0);

    useEffect(() => {
        const startLesson = async () => {
            let result = await startLessonRequest(lesson.id);
            if (result?.completed)
              result = await resetLessonRequest(lesson.id);
            if (result === null)
              router.back();
            setLessonProgress(result);  
            setIndex(result.currentStep);
            setLoading(false);
        };
        startLesson();
    }, []);

    useEffect(() => {
      const finishLesson = async () => {
        setLoading(true)
        const result = await completeLessonRequest(lesson.id)
        if (result === null)
          router.back()
        setLessonProgress(result)
        setLoading(false)
        onComplete(lessonProgress)
      };

      const updateLesson = async () => {
        if (index === 0)
          return;
        setLoading(true)
        const result = await updateLessonRequest(lesson.id, index, false);
        if (result === null)
          router.back()
        setLessonProgress(result)
        setLoading(false)
      }

      if (index === exercisesList.length)
        finishLesson();
      else
        updateLesson();
    }, [index])

    if (loading) {
        return (
          <AppView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#fff' }}>Loading...</Text>
          </AppView>
        );
      }
    return (
      <AppView className="flex-1">
        <ProgressBar index={index} maxLength={exercisesList.length}/>
        <AppView className="flex-1">
          <PlayExercise onNext={(
          ) => setIndex(index + 1)} exercise={exercisesList[index]}/>
        </AppView>
      </AppView>
    );
}

export default PlayLesson;
