import { useEffect, useState } from "react";
import Block from "../Block";
import { Text, View } from "react-native";
import Title from "../Title";
import { completeLessonRequest, getExerciseFromLessonRequest, startLessonRequest, updateLessonRequest } from "@/services/lessons";
import { Exercise, LessonProgress } from "@/types/LessonInterface";
import { router } from "expo-router";
import PlayExercise from "./Exercises/PlayExercise";

interface PlayLessonProps {
  lessonId: string
}

const PlayLesson: React.FC<PlayLessonProps> = ({lessonId}) => {
    const [loading, setLoading] = useState(true);
    const [LessonProgress, setLessonProgress] = useState<LessonProgress>();
    const [exercisesList, setExercisesList] = useState<Exercise[]>([])
    const [index, setIndex] = useState<number>(0);

    useEffect(() => {
        const startLesson = async () => {
            const result = await startLessonRequest(lessonId);
            if (result === null)
              router.back();
            else
              setLessonProgress(result)
            const exercises = await getExerciseFromLessonRequest(lessonId)
            if (exercises.length === 0)
              router.back()
            setExercisesList(exercises)
            setLoading(false);
        };
        startLesson();
    }, []);

    useEffect(() => {
      const finishLesson = async () => {
        setLoading(true)
        const result = await completeLessonRequest(lessonId)
        if (result === null)
          router.back()
        setLessonProgress(result)
        setLoading(false)
      };

      const updateLesson = async () => {
        setLoading(true)
        const result = await updateLessonRequest(lessonId, index, false);
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
          <Block style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#fff' }}>Loading...</Text>
          </Block>
        );
      }

    return (
      <Block >
          <View>
            <PlayExercise onNext={() => setIndex(index + 1)} exercise={exercisesList[index]}/>
          </View>
      </Block>
    );
}

export default PlayLesson;