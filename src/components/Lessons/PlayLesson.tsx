import { useEffect, useState } from "react";
import Block from "../Block";
import { Text, View } from "react-native";
import Title from "../Title";
import { completeLessonRequest, getExerciseFromLessonRequest, startLessonRequest, updateLessonRequest } from "@/services/lessons";
import { Exercise, LessonProgress, LessonWithExercises } from "@/types/LessonInterface";
import { router } from "expo-router";
import PlayExercise from "./Exercises/PlayExercise";

interface PlayLessonProps {
  lesson: LessonWithExercises;
}

const PlayLesson: React.FC<PlayLessonProps> = ({lesson}) => {
    const [loading, setLoading] = useState(true);
    const [LessonProgress, setLessonProgress] = useState<LessonProgress>();
    const [exercisesList, setExercisesList] = useState<Exercise[]>(lesson.exercises);
    const [index, setIndex] = useState<number>(0);

    useEffect(() => {
        const startLesson = async () => {
            const result = await startLessonRequest(lesson.id);
            if (result === null)
              router.back();
            else
              setLessonProgress(result);
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
        router.back()
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