import { useEffect, useState } from "react";
import Block from "../Block";
import { Text, TouchableOpacity, View } from "react-native";
import Title from "../Title";
import { completeLessonRequest, getExerciseFromLessonRequest, resetLessonRequest, startLessonRequest, updateLessonRequest } from "@/services/lessons";
import { Exercise, LessonProgress, LessonWithExercises } from "@/types/LessonInterface";
import { router } from "expo-router";
import PlayExercise from "./Exercises/PlayExercise";
import CrossIcon from '@assets/Courses/cross.svg'

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
          <Block style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#fff' }}>Loading...</Text>
          </Block>
        );
      }
    return (
      <View className="flex-1">
        <View className="flex-row w-full h-[5%] items-center m-[4%] mb-[2%] gap-[4%]">
          <TouchableOpacity onPress={() => router.back()}>
            <CrossIcon width={25} height={25}/>
          </TouchableOpacity>
          <View className="w-[79%] bg-gray-300 rounded-full">
            <View className={`bg-[#45B6FE] w-[${Math.round(index / exercisesList.length * 100)}%] h-[45%] rounded-full`} style={{ width: `${Math.round((index / exercisesList.length) * 100)}%` }}>
            </View>
          </View>
        </View>
        <View className="flex-1">
          <PlayExercise onNext={(
          ) => setIndex(index + 1)} exercise={exercisesList[index]}/>
        </View>
      </View>
    );
}

export default PlayLesson;