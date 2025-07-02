import { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { LessonProgress, LessonWithExercises } from "@/types/LessonInterface";
import { router } from "expo-router";
import AppView from "../Ui/AppView";
import Text from "../Ui/Text";
import { runOnJS, useAnimatedReaction, Easing, useSharedValue, withTiming } from "react-native-reanimated";
import { ArrowLeft, CheckCircle, Trophy } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
      <SafeAreaView className="flex-1" edges={['top']}>
        <TouchableOpacity onPress={() => router.back()} className="pl-2 hover:bg-gray-800/50 rounded-full transition-colors"><ArrowLeft color={"#68d391"} size={30} /></TouchableOpacity>
        <AppView className="flex-1 items-center">
          <View className="w-32 h-32 bg-green-500/20 rounded-full flex items-center justify-center mt-20">
            <View className="w-24 h-24 bg-green-500/30 rounded-full flex items-center justify-center">
              <CheckCircle color={"#68d391"} size={50} className="w-16 h-16" />
            </View>
          </View>
          <AppView className="w-full h-[20%] items-center justify-center">
            <Text className="text-white text-3xl font-bold mb-2">Entrainement terminée !</Text>
            <Text className="text-gray-400 text-lg ">Excellent travail ! Vous progressez bien</Text>
          </AppView>
          <AppView className="w-[80%]">
            <View className="w-full flex-row gap-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4">
              <View className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <Trophy color={"#68d391"} size={20} />
              </View>
              <View>
                <Text className="text-gray-400 text-sm">Précision</Text>
                <Text className="text-green-400 text-xl font-bold">{displayedProgress}%</Text>
              </View>
            </View>
          </AppView>
        </AppView>
        <AppView className="bottom-6 left-0 w-full items-center">
        <TouchableOpacity 
          className="p-4 w-[90%] rounded-3xl bg-duoGreen"
          onPress={() => {router.back()}}>
            <Text className="text-2l font-extrabold text-center text-white">
              Retour aux Leçons
            </Text>
        </TouchableOpacity>
      </AppView>
      </SafeAreaView>
    );
}

export default LessonComplete;