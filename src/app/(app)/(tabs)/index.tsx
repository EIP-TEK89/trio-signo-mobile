import { useAuth } from "@/context/AuthContext";
import { getLessonsRequest } from "@/services/lessons";
import { Lesson } from "@/types/LessonInterface";
import Block from "@components/Block";
import CourseButton from "@components/CourseButton";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const { onLogout } = useAuth();

  useEffect(() => {
    const loadLessons = async () => {
      const response = await getLessonsRequest();
      setLessons(response);
      setLoading(false);
    };
    loadLessons();
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
    <SafeAreaView className="flex-1 bg-black">
      <Block className="flex-1 justify-center items-center w-full">
        <View className="flex-row w-full h-12 justify-between px-4 items-center">
          <TouchableOpacity onPress={onLogout}>
            <Image
              source={require("@assets/icons/cross-button.png")}
              className="w-7 h-7"
              alt="cross-Image"
            />
          </TouchableOpacity>
          <View className="flex-row items-center gap-2">
            <Image
              source={require("@assets/icons/life.png")}
              className="w-7 h-7"
              alt="Life"
            />
            <Text className="text-white text-base">5</Text>
          </View>
        </View>

        <ScrollView contentContainerClassName="mt-12 flex-1 items-center justify-center w-full px-4">
          {lessons.map((lesson) => (
            <CourseButton
              key={lesson.id}
              title={lesson.title}
              onPress={() => router.push(`/courses`)}
            />
          ))}
        </ScrollView>
      </Block>
    </SafeAreaView>
  );
}
