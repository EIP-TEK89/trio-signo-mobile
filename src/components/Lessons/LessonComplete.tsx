import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { LessonProgress, LessonWithExercises } from "@/types/LessonInterface";
import { router } from "expo-router";
import AccurencyIcon from '@assets/Courses/accurency.svg'
import AppView from "../Ui/AppView";
import Text from "../Ui/Text";
import { runOnJS, useAnimatedReaction, Easing, useSharedValue, withTiming } from "react-native-reanimated";

interface LessonCompleteProps {
  lesson: LessonWithExercises;
  lessonProgress: LessonProgress;
}

const LessonComplete: React.FC<LessonCompleteProps> = ({lesson, lessonProgress}) => {
    const progress = useSharedValue(0);
    const [displayedProgress, setDisplayedProgress] = useState(0);
    
      useEffect(() => {
        progress.value = withTiming(lessonProgress.score, {
          duration: 600,
          easing: Easing.inOut(Easing.ease),
        });
      }, [lessonProgress.score, progress]);
    
      useAnimatedReaction(
        () => progress.value,
        (current, previous) => {
          runOnJS(setDisplayedProgress)(Math.round(current));
        }
      )

    return (
      <AppView className="flex-1">
        <AppView className="flex-1 justify-center items-center">
          <AppView className="w-full h-[20%] items-center justify-center">
            <Text className="text-3xl font-extrabold text-center">Entrainement terminée !</Text>
          </AppView>
          <AppView className="w-full h-[20%] flex-row flex-wrap justify-center gap-5">
            <AppView className="w-[30%] h-[50%] bg-duoBlue rounded-2xl items-center pb-1 pl-1 pr-1">
              <Text className="font-extrabold text-center color-background">Précision</Text>
              <AppView className="flex-1 w-full rounded-2xl items-center justify-center flex-row">
                <AccurencyIcon width={25} height={25} />
                <Text className="texl-2l font-extrabold text-center">{displayedProgress}%</Text>

              </AppView>
            </AppView>
          </AppView>
        </AppView>
        <AppView className="absolute bottom-6 left-0 w-full items-center">
        <TouchableOpacity 
          className="p-4 w-[90%] rounded-2xl bg-[#45B6FE]"
          onPress={() => {router.back()}}>
            <Text className="text-2l font-extrabold text-center">
              BACK TO LESSONS
            </Text>
        </TouchableOpacity>
      </AppView>
      </AppView>
    );
}

export default LessonComplete;