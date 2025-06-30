import Text from "@/components/Ui/Text";
import { useAuth } from "@/context/AuthProvider";
import { useCallback, useEffect, useState } from "react";

import {
  ScrollView,
  TouchableOpacity
} from "react-native";
import AppView from "@/components/Ui/AppView";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProgressStats } from "@/types/LessonInterface";
import Loading from "@/components/Ui/Loading";
import { getLessonProgressStats } from "@/services/lessonProgressServices";
import Button from "@/components/Ui/Button";
import { router } from "expo-router";

export default function ProfileScreen() {
  const { onLogout, onDelete,  authState } = useAuth();
  const user = authState.user
  const [stats, setStats] = useState<ProgressStats | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const loadStats = async () => {
      const statsResponse = await getLessonProgressStats();
      setStats(statsResponse);
      setLoading(false);
    };
    
    loadStats()
  }, [])

  const formatToMonthYear = useCallback((isoString) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'long',
    }).format(date);
  }, []);

  if (loading) {
    return (<Loading />)
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
      <AppView className="mb-6">
        <AppView className="items-center mt-6 mb-5">
          <AppView className="bg-foreground w-[100] aspect-square justify-center items-center rounded-full mb-2">
            <AppView className="bg-background w-[50%] aspect-square rounded-full mb-2"/>
          </AppView>
          <AppView className="absolute top-[70%] bg-background w-[30%] aspect-square rounded-full mb-2"/>
        </AppView>
        {user?.firstName && user?.lastName && 
        <Text className="text-xl font-bold"> {(user?.firstName ?? '') + ' ' + (user?.lastName ?? '')}</Text>
        }
        <AppView className="flex-row items-center">
          <Text className="">{"@" + user.username}</Text>
          <Text className="m-1 mb-2">.</Text>
          <Text className="">{"Membre depuis " + formatToMonthYear(user.createdAt)}</Text>
        </AppView>
      </AppView>
      
      <AppView className="flex-1 items-center">
      <ScrollView className="flex-1 w-full rounded-2xl mt-2" contentContainerClassName="">
      <AppView className="flex-1 bg-[#121f29] items-center pt-3 gap-4">
        <AppView className="w-[95%] p-6 rounded-2xl items-center border border-[#384e5a]">
          <Text className="text-2xl mb-6 text-duoGreen">Statistiques</Text>
          <AppView className="w-[95%] flex-row justify-around">
            <AppView className="flex-row w-[35%]">
              <AppView className="h-16 w-full  bg-duoGreen rounded-2xl pb-1 pl-1 pr-1 ">
                <Text className="font-extrabold text-center color-background">Score Moyen</Text>
                <AppView className="flex-1 w-full rounded-2xl items-center justify-center ">
                  <Text className="texl-2l font-extrabold text-center">{stats.averageScore}</Text>
                </AppView>
              </AppView>
            </AppView>
            <AppView className="flex-row w-[35%] ">
              <AppView className="w-full bg-duoGreen rounded-2xl pb-1 pl-1 pr-1">
                <Text className="font-extrabold text-center color-background">Leçons</Text>
                <AppView className="flex-1 w-full rounded-2xl items-center justify-center ">
                  <Text className="texl-2l font-extrabold text-center">{stats.completedLessons} / {stats.totalLessons}</Text>
                </AppView>
              </AppView>
            </AppView>
          </AppView>
        </AppView>
        <AppView className="w-[95%] p-6 rounded-2xl items-center border border-[#384e5a] ">
          <Text className="text-2xl mb-6 text-duoGreen">Votre compte</Text>
          <AppView className="w-[95%] justify-around gap-4">
            <AppView className="gap-8 mb-4">
            <AppView className="gap-2">
            <AppView className="flex-row justify-between">
              <Text>Email</Text>
              <Text className="text-duoBlue">{user.email}</Text>
            </AppView>
            <AppView className="border-b border-gray-400"/>
            </AppView>
            <AppView className="gap-2">
            <AppView className="flex-row justify-between">
              <Text>Identifiant</Text>
              <Text className="text-duoBlue">{user.username}</Text>
            </AppView>
            <AppView className="border-b border-gray-400"/>
            </AppView>
            <AppView className="gap-2">
            <AppView className="flex-row justify-between">
              <Text>Mot de Passe</Text>
              <Text>********</Text>
            </AppView>
            <AppView className="border-b border-gray-400"/>
            </AppView>
            </AppView>
            <Button title="Editer son Profile" onPress={() => {onDelete(); router.replace("/login")}} className="bg-duoBlue"/>
            <Button title="Supprimer son compte" onPress={() => router.navigate("/(app)/userEditor/user")} className="border border-red-500 bg-background"/>
          </AppView>
        </AppView>
        <AppView className="w-[95%] my-6 rounded-2xl">
          <TouchableOpacity
            onPress={() => onLogout()}
            className="flex-1 p-4 rounded-2xl border-2 border-b-4 border-darkenedDuoGreen">
              <Text className="text-2l font-black color-duoGreen text-center">
                SE DECONNECTER
              </Text>
          </TouchableOpacity>
        </AppView>
      </AppView>
      </ScrollView>
      </AppView>
    </SafeAreaView>
  );
}
