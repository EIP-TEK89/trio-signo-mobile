import { useAuth } from "@/context/AuthContext";
import { getLessonsRequest } from "@/services/lessons";
import { getUserRequest } from "@/services/user";
import { Lesson } from "@/types/LessonInterface";
import Block from "@components/Block";
import CourseButton from "@components/CourseButton";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import HeartIcon from '@assets/CoursesJourney/Home/Header/life.svg'
import FlameIcon from '@assets/CoursesJourney/Home/Header/flame.svg'
import FlameIgniteIcon from '@assets/CoursesJourney/Home/Header/flameIgnite.svg'
import GemsIcon from '@assets/CoursesJourney/Home/Header/gems.svg'

import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import LessonButton from "@/components/Home/LessonButton";
import { useTheme } from "@/context/ThemeContext";
import Recognize from "@/components/AIRecognizer/Recognize";

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [streak, setStreak] = useState<number>(0);
  const [life, setLife] = useState<number>(5);
  const [gems, setGems] = useState<number>(5);
  const theme = useTheme();
  const { onLogout } = useAuth();

  useEffect(() => {
    const checkLogin = async () => {
      const response = await getUserRequest();
      if (response === null) {
        onLogout();
        return;
      }
    };

    const loadLessons = async () => {
      const response = await getLessonsRequest();
      setLessons(response);
    };

    const init = async () => {
      await checkLogin();
      await loadLessons();
      setLoading(false);
    };

    init();
  }, []);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-black">
        <Block className="flex-1 justify-center items-center">
          <Text className="text-white">Loading...</Text>
        </Block>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Block className="flex-1">
        {/* Header */}
        
        <View className="flex-row w-full h-12 justify-between px-4 items-center">
          <View>
            <Text className="text-white font-bold text-xl">Trio Signo</Text>
          </View>
          {streak <= 0 ? 
          <View className="flex-row items-center gap-2">
            <FlameIcon width={30} height={30} />
            <Text className="text-gray-500 font-bold text-xl">{streak}</Text>
          </View>
          :
          <View className="flex-row items-center gap-2">
            <FlameIgniteIcon width={30} height={30} />
            <Text className="text-yellow-500 font-bold text-xl">{streak}</Text>
          </View>}
          <View className="flex-row items-center gap-2">
            <GemsIcon width={25} height={25} />
            <Text className="text-blue-500 font-bold text-xl">{life}</Text>
          </View>
          <View className="flex-row items-center gap-2">
            <HeartIcon width={30} height={30} />
            <Text className="text-red-500 font-bold text-xl">{life}</Text>
          </View>
        </View>
        <View className="w-full h-24 items-center">
          <View 
            style={{ backgroundColor: theme.colors.duoGreen }}
            className="w-[90%] h-full rounded-2xl p-4"
            >
            <Text
              style={{ color: theme.colors.background }}
              className="text-l font-bold">
              Chapitre 1, Unité 1
            </Text>
            <Text 
              style={{ color: theme.colors.background }}
              className="text-xl font-black">
              Introduction à la langue des signes
            </Text>
          </View>
        </View>

        {/* Scrollable lesson list */}
        <View className="flex-1 mt-6">
        <ScrollView contentContainerClassName="w-full items-center pt-3" showsVerticalScrollIndicator={true}>
          {lessons.map((lesson, index) => {
            const position = Math.sin((index / (lessons.length - 1)) * (2 * Math.PI));
            const translateX = 70 * position

            return (
              <View 
                key={lesson.id}
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
                    params: { lesson: lesson.id },
                  })
                }
              />
            </View>
          )})}
        </ScrollView>
        </View>
      </Block>
    </SafeAreaView>
  );
}
