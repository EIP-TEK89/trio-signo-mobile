import { useAuth } from "@/context/AuthProvider";
import { getAllLessons } from "@/services/lessonsServices";
import { getCurrentUser } from "@/services/userServices";
import { Lesson } from "@/types/LessonInterface";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import HeartIcon from '@assets/CoursesJourney/Home/Header/life.svg'
import FlameIcon from '@assets/CoursesJourney/Home/Header/flame.svg'
import FlameIgniteIcon from '@assets/CoursesJourney/Home/Header/flameIgnite.svg'
import GemsIcon from '@assets/CoursesJourney/Home/Header/gems.svg'

import {
  ScrollView,
} from "react-native";
import LessonButton from "@/components/Home/LessonButton";
import AppText from "@/components/Ui/AppText";
import AppView from "@/components/Ui/AppView";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [streak, ] = useState<number>(0);
  const [life, ] = useState<number>(5);
  const { onLogout } = useAuth();

  useEffect(() => {
    const loadLessons = async () => {
      const response = await getAllLessons();
      setLessons(response);
    };

    const init = async () => {
      await loadLessons();
      setLoading(false);
    };

    init();
  }, [onLogout]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-black">
        <AppView className="flex-1 justify-center items-center">
          <AppText className="text-white">Loading...</AppText>
        </AppView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background"
    edges={['top']}>
      <AppView className="flex-1">
        {/* Header */}
        
        <AppView className="flex-row w-full h-12 justify-between px-4 items-center">
          <AppView>
            <AppText className="font-bold text-xl text-text">Trio Signo</AppText>
          </AppView>
          {streak <= 0 ? 
          <AppView className="flex-row items-center gap-2">
            <FlameIcon width={30} height={30} />
            <AppText className="text-gray-500 font-bold text-xl text-[text]">{streak}</AppText>
          </AppView>
          :
          <AppView className="flex-row items-center gap-2">
            <FlameIgniteIcon width={30} height={30} />
            <AppText className="text-yellow-500 font-bold text-xl">{streak}</AppText>
          </AppView>}
          <AppView className="flex-row items-center gap-2">
            <GemsIcon width={25} height={25} />
            <AppText className="text-blue-500 font-bold text-xl">{life}</AppText>
          </AppView>
          <AppView className="flex-row items-center gap-2">
            <HeartIcon width={30} height={30} />
            <AppText className="text-red-500 font-bold text-xl">{life}</AppText>
          </AppView>
        </AppView>
        <AppView className="w-full h-24 items-center">
          <AppView
            className="w-[90%] h-full rounded-2xl p-4 bg-duoGreen"
            >
            <AppText
              className="text-l font-bold text-text">
              Chapitre 1, Unité 1
            </AppText>
            <AppText 
              className="text-xl font-black text-text">
              Introduction à la langue des signes
            </AppText>
          </AppView>
        </AppView>

        {/* Scrollable lesson list */}
        <AppView className="flex-1 mt-6">
        <ScrollView contentContainerClassName="w-full items-center pt-3" showsVerticalScrollIndicator={true}>
          {lessons.map((lesson, index) => {
            const position = Math.sin((index / (lessons.length - 1)) * (2 * Math.PI));
            const translateX = 70 * position

            return (
              <AppView 
                key={lesson?.id}
                className="items-center"
                style={{
                  flex: 1,
                  transform: [
                    {
                      translateX: translateX,
                    },
                  ],
                  marginBottom: 25,
                }}
              >
              <LessonButton
                position={position}
                completed={index === 0 ? true : false}
                onPress={() =>
                  router.push({
                    pathname: "/(app)/lesson/[lesson]",
                    params: { lesson: lesson?.id },
                  })
                }
              />
            </AppView>
          )})}
        </ScrollView>
        </AppView>
      </AppView>
    </SafeAreaView>
  );
}
