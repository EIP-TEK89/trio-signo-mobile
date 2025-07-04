import Text from "@/components/Ui/Text";
import { useAuth } from "@/context/AuthProvider";
import { useCallback, useEffect, useState } from "react";

import {
  ScrollView,
  TouchableOpacity,
  View
} from "react-native";
import AppView from "@/components/Ui/AppView";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProgressStats } from "@/types/LessonInterface";
import Loading from "@/components/Ui/Loading";
import { getLessonProgressStats } from "@/services/lessonProgressServices";
import Button from "@/components/Ui/Button";
import { router } from "expo-router";
import Image from "@/components/Ui/Image";
import { getCurrentUser } from "@/services/userServices";

export default function ProfileScreen() {
  const { onLogout, authState } = useAuth();
  const user = authState.user
  const [stats, setStats] = useState<ProgressStats | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const loadStats = async () => {
      const statsResponse = await getLessonProgressStats();
      const user = await getCurrentUser();
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
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      {/* Header */}
        <AppView className="w-full flex-row items-center justify-center h-16 mb-5 gap-2 border-b border-gray-800/50">
          <Image source={require("@assets/logo.png")} contentFit="contain"
            className="w-10 aspect-square bg-red"/>
          <Text className="text-green-400 text-2xl font-bold">TrioSigno</Text>
        </AppView>
      <AppView className="">
        <AppView className="items-center">
          <AppView className="w-[20%] aspect-square rounded-full justify-center bg-gray-700 mb-4">
            {user.firstName && user.lastName &&
            <Text className="text-center text-2xl text-white">{(user?.firstName[0] + user?.lastName[0]).toUpperCase()}</Text>}
          </AppView>
          {user?.firstName && user?.lastName && 
           <Text className="text-white text-2xl font-bold mb-1"> {(user?.firstName ?? '') + ' ' + (user?.lastName ?? '')}</Text>
            }
          <AppView className="flex-row items-center">
            <Text className="">{"@" + user.username}</Text>
            <Text className="m-1 mb-2">.</Text>
            <Text className="">{"Membre depuis " + formatToMonthYear(user.createdAt)}</Text>
          </AppView>
        </AppView>
        
      </AppView>
      
      <AppView className="flex-1 items-center">
      <ScrollView className="flex-1 w-full rounded-2xl mt-2" contentContainerClassName="">
      <AppView className="flex-1 bg-[#121f29] items-center pt-3 gap-4">
        <AppView className="w-[95%] p-6 items-center">
          <Text className="text-green-400 text-xl font-semibold text-center mb-6">Statistiques</Text>
          <View className="flex-row gap-4">
          <AppView className="w-[50%] bg-green-500/20 rounded-2xl p-4 border-2 border-green-500/50">
            <View className="items-center">
              <Text className="text-green-400 text-sm font-medium mb-2">Score Moyen</Text>
              <Text className="w-[95%] text-center text-white text-2xl font-bold bg-gray-900 rounded-xl py-2 px-4">{stats?.averageScore ?? 0}%</Text>
            </View>
          </AppView>
          <AppView className="w-[50%] bg-green-500/20 rounded-2xl p-4 border-2 border-green-500/50">
            <View className="items-center">
              <Text className="text-green-400 text-sm font-medium mb-2">Leçons</Text>
              <Text className="w-[95%] text-center text-white text-2xl font-bold bg-gray-900 rounded-xl py-2 px-4">{stats?.completedLessons} / {stats?.totalLessons}</Text>
            </View>
          </AppView>
          </View>
        </AppView>
        <AppView className="w-[95%] bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
          <Text className="text-green-400 text-xl font-semibold text-center mb-6">Votre compte</Text>
          <View className="w-[95%] justify-around gap-4">
            <View className="gap-8 mb-4">
            <View className="gap-2">
            <View className="flex-row flex justify-between items-center py-2 border-b border-gray-600/50">
              <Text className="text-white font-medium">Email</Text>
              <Text className="text-duoBlue">{user.email}</Text>
            </View>
            </View>
            <View className="gap-2">
            <View className="flex-row flex justify-between items-center py-2 border-b border-gray-600/50">
              <Text className="text-white font-medium">Identifiant</Text>
              <Text className="text-duoBlue">{user.username}</Text>
            </View>
            </View>
            <View className="gap-2">
            <View className="flex-row flex justify-between items-center py-2 border-b border-gray-600/50">
              <Text className="text-white font-medium">Mot de Passe</Text>
              <Text>********</Text>
            </View>
            </View>
            </View>
            <Button title="Editer son Profile" onPress={() => router.navigate("/(app)/userEditor/user")} className="bg-duoGreen"/>
            {/* <Button title="Supprimer son compte" onPress={() => {onDelete(); router.replace("/login")}} className="border border-red-500 bg-background"/> */}
          </View>
        </AppView>
        <AppView className="w-[95%] my-6 rounded-2xl">
          <TouchableOpacity
            onPress={() => onLogout()}
            className="flex-1 p-4 rounded-2xl border-2 border border-red-500/50 bg-red-500/20">
              <Text className="text-2l font-black color-white text-center">
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
