import { useAuth } from "@/context/AuthProvider";
import { UserLessonWithProgress } from "@/types/LessonInterface";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import Text from "@/components/Ui/Text";
import AppView from "@/components/Ui/AppView";
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "@/components/Ui/Loading";
import Image from "@/components/Ui/Image";
import { getAllLessonProgress } from "@/services/lessonProgressServices";
import { Star, Play, Clock, Circle, CheckCircle } from 'lucide-react-native';

enum LessonStatus {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [lessons, setLessons] = useState<UserLessonWithProgress[]>([]);
  const { onLogout } = useAuth();

  useEffect(() => {
    const loadLessons = async () => {
      const response = await getAllLessonProgress();
      setLessons(response);
    };

    const init = async () => {
      await loadLessons();
      setLoading(false);
    };

    init();
  }, [onLogout]);

  const getLessonStatus = useCallback((lesson: UserLessonWithProgress) => {
    if (lesson.progress === null)
      return (LessonStatus.NOT_STARTED);
    if (lesson.progress.completed === true)
      return (LessonStatus.COMPLETED);
    return (LessonStatus.IN_PROGRESS);
  }, []);

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background"
    edges={['top']}>
      <AppView className="flex-1">

        {/* Header */}
        <AppView className="w-full flex-row items-center justify-center h-16 mb-3 gap-2 border-b border-gray-800/50">
          <Image source={require("@assets/logo.png")} contentFit="contain"
            className="w-10 aspect-square bg-red"/>
          <Text className="text-green-400 text-2xl font-bold">TrioSigno</Text>
        </AppView>
        <AppView className="px-6 py-8 text-center">
            <Text
              className="text-2xl font-bold text-text text-center">
              Chapitre 1, Unité 1
            </Text>
            <Text
              className="text-lg font-black text-text text-center">
              Introduction à la langue des signes
            </Text>
        </AppView>
        {/* Scrollable lesson list */}
        <AppView className="flex-1">
        <ScrollView contentContainerClassName="w-full items-center pt-3" showsVerticalScrollIndicator={true}>
          {lessons.map((lesson, index) => {
            const lessonStatus = getLessonStatus(lesson);

            return (
              <AppView
                key={lesson?.id}
                className="bg-gray-800/50 flex-1 w-[90%] flex-row rounded-xl mb-4 border border-gray-700/50"
              >
                <View className="bg-gray-800/50 flex-1 gap-6 p-6 rounded-xl">
                <View className="flex-row">
                  <View>
                    <View>
                      <Text className="text-green-400 text-xl font-bold mb-2">
                        Leçon {index + 1}
                    </Text>
                  </View>
                  <View className="flex-row items-center gap-2">
                    <Text className="text-sm">
                      Difficulté:
                    </Text>
                    {lesson.level === "BEGINNER" &&
                      <View className="flex-row">
                        <Star size={18} fill={"yellow"} color={"yellow"}/>
                        <Star size={18} fill={"gray"} color={"gray"}/>
                        <Star size={18} fill={"gray"} color={"gray"}/>
                      </View>
                    }
                    {lesson.level === "INTERMEDIATE" &&
                      <View className="flex-row">
                        <Star size={18} fill={"yellow"} color={"yellow"}/>
                        <Star size={18} fill={"yellow"} color={"yellow"}/>
                        <Star size={18} fill={"gray"} color={"gray"}/>
                      </View>
                    }
                    {lesson.level === "ADVANCE" &&
                      <View className="flex-row">
                        <Star size={18} fill={"yellow"} color={"yellow"}/>
                        <Star size={18} fill={"yellow"} color={"yellow"}/>
                        <Star size={18} fill={"yellow"} color={"yellow"} />
                      </View>
                    }
                  </View>
                </View>
                <TouchableOpacity className="flex-1 flex-row items-center justify-center bg-green-500 rounded-3xl ml-5 gap-2" onPress={() => router.push({pathname: "/(app)/lesson/[lesson]", params: {lesson: lesson?.id}})}>
                  <Play size={16} color={"white"}/>
                  {lessonStatus === LessonStatus.IN_PROGRESS && <Text className="font-bold text-center text-sm">Continuer La Leçon</Text>}
                  {lessonStatus === LessonStatus.NOT_STARTED && <Text className="font-bold text-center text-sm">Démarrer La Leçon</Text>}
                  {lessonStatus === LessonStatus.COMPLETED && <Text className="font-bold text-center text-sm">Revoir La Leçon</Text>}
                </TouchableOpacity>
                </View>
                <View className="flex-row items-center justify-between">
                <View>
                  <Text className="text-gray-200 text-lg font-medium">{lesson.title}</Text>
                </View>
                <View>
                  {lessonStatus === LessonStatus.NOT_STARTED && <View className="flex-row gap-2"><Circle color={"#CBD5E0"} size={20} /><Text className="text-gray-400">Prête</Text></View>}
                  {lessonStatus === LessonStatus.IN_PROGRESS && <View className="flex-row gap-2"><Clock color={"#FFF176"} size={20} /><Text className="text-yellow-300">En cours</Text></View>}
                  {lessonStatus === LessonStatus.COMPLETED && <View className="flex-row gap-2"><CheckCircle color={"#68d391"} size={20} /><Text className="text-green-400">Complétée</Text></View>}
                </View>
                </View>
              </View>
            </AppView>
          )})}
        </ScrollView>
        </AppView>
      </AppView>
    </SafeAreaView>
  );
}
