import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import Title from "../Title";
import { completeLessonRequest, getExerciseFromLessonRequest, resetLessonRequest, startLessonRequest, updateLessonRequest } from "@/services/lessons";
import { Exercise, LessonProgress, LessonWithExercises } from "@/types/LessonInterface";
import { router } from "expo-router";
import AccurencyIcon from '@assets/Courses/accurency.svg'
import AppView from "../Ui/AppView";
import AppText from "../Ui/AppText";

interface LessonCompleteProps {
  lesson: LessonWithExercises;
  lessonProgress: LessonProgress;
}

const LessonComplete: React.FC<LessonCompleteProps> = ({lesson, lessonProgress}) => {
    const [loading, setLoading] = useState(true);
    const [index, setIndex] = useState<number>(0);

    return (
      <AppView className="flex-1">
        <AppView className="flex-1 justify-center items-center">
          <AppView className="w-full h-[20%] items-center justify-center">
            <AppText className="text-3xl font-extrabold text-center">Training finished !</AppText>
          </AppView>
          <AppView className="w-full h-[20%] flex-row flex-wrap justify-center gap-5">
            <AppView className="w-[30%] h-[50%] bg-[#45B6FE] rounded-2xl items-center pb-1 pl-1 pr-1">
              <AppText className="font-extrabold text-center">ACCURACY</AppText>
              <AppView className="flex-1 w-full bg-white rounded-2xl items-center justify-center flex-row">
                <AccurencyIcon width={25} height={25} />
                <AppText className="texl-2l font-extrabold text-center">{lessonProgress.score}%</AppText>
              </AppView>
            </AppView>
          </AppView>
        </AppView>
        <AppView className="absolute bottom-6 left-0 w-full items-center">
        <TouchableOpacity 
          className="p-4 w-[90%] rounded-2xl bg-[#45B6FE]"
          onPress={() => {router.back()}}>
            <AppText className="text-2l font-extrabold text-center">
              BACK TO LESSONS
            </AppText>
        </TouchableOpacity>
      </AppView>
      </AppView>
    );
}

export default LessonComplete;