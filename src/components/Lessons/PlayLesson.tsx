import { useEffect, useState } from "react";
<<<<<<< HEAD
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
=======
import Block from "../Block";
import { Text, View } from "react-native";
import Title from "../Title";
import { startLesson } from "@/services/lessons";
import { LessonProgress } from "@/types/LessonInterface";
import { router } from "expo-router";

const PlayLesson: React.FC<string> = (lessonId) => {
    const [loading, setLoading] = useState(true);
    const [LessonProgress, setLessonProgress] = useState<LessonProgress>();
    const [signsImages, setSignsImages] = useState<string[]>([]);
    const [responded, setResponded] = useState(false);

    useEffect(() => {
        const runLesson = async () => {
            const result = await startLesson(lessonId);
            if (result !== null)
                setLessonProgress(result);
            else
                router.back();
            setLoading(false);
        };
        runLesson();
    }, []);

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
          </View>
      </Block>
    );
}
>>>>>>> 89fc775 (feat: add new components and assets for lesson exercises)
