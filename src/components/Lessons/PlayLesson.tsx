import { useEffect, useState } from "react";
import AppView from "../Ui/AppView";
import { completeLessonProgress, resetLessonProgress, startLessonProgress, updateLessonProgress } from "@/services/lessonProgressServices";
import { Exercise, LessonProgress, LessonWithExercises } from "@/types/LessonInterface";
import { router } from "expo-router";
import PlayExercise from "./Exercises/PlayExercise";
import ProgressBar from "../Ui/ProgressBar";
import Loading from "../Ui/Loading";
import CrossIcon from"@assets/Courses/cross.svg";
import { TouchableOpacity } from "react-native";

interface PlayLessonProps {
  lesson: LessonWithExercises;
  onComplete: (lessonResult: LessonProgress) => void;
}

const PlayLesson: React.FC<PlayLessonProps> = ({lesson, onComplete}) => {
    const [loading, setLoading] = useState(true);
    const exercisesList : Exercise[] = lesson.exercises;
    const [index, setIndex] = useState<number>(0);

    useEffect(() => {
        const startLesson = async () => {
            let result = await startLessonProgress(lesson?.id);
            if (result?.completed)
              result = await resetLessonProgress(lesson?.id);
            if (result === null){
              console.error("Error starting lesson progress");
              router.back();
            }
            setIndex(result.currentStep);
            setLoading(false);
        };
        startLesson();
    }, [lesson?.id]);
    
    useEffect(() => {
      const finishLesson = async () => {
        setLoading(true)
        const result = await completeLessonProgress(lesson?.id)
        if (result === null)
          router.back()
        setLoading(false)
        onComplete(result)
      };

      const updateLesson = async () => {
        if (index === 0)
          return;
        setLoading(true)
        const result = await updateLessonProgress(lesson?.id, {currentStep: index, completed: false});
        if (result === null)
          router.back()
        setLoading(false)
      }

      if (index === exercisesList.length)
        finishLesson();
      else
        updateLesson();
    }, [index, lesson?.id, onComplete, exercisesList.length])

    if (loading) {
        return (
          <Loading />
        );
      }
    return (
      <AppView className="flex-1">
        <AppView className="flex-row items-center gap-2 mt-5 mb-3 px-2">
          <TouchableOpacity
          onPress={() => router.push("/(app)/(tabs)")}
          className="rounded-xl p-2"
          >
            <CrossIcon width={30} height={30} />
          </TouchableOpacity>
          <ProgressBar index={index} maxLength={exercisesList.length} />
        </AppView>
        <AppView className="flex-1">
          <PlayExercise onNext={(
          ) => setIndex(index + 1)} exercise={exercisesList[index]}/>
        </AppView>
      </AppView>
    );
}

export default PlayLesson;
