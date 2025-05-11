import Category from "@/components/Profile/Category";
import { useAuth } from "@/context/AuthContext";
import { getLessonsRequest } from "@/services/lessons";
import { getUserRequest } from "@/services/user";
import { Lesson } from "@/types/LessonInterface";
import { User } from "@/types/UserInterface";
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

export default function ProfileScreen() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>(null);
  const { onLogout } = useAuth();

  useEffect(() => {
    const getUser = async () => {
      const response = await getUserRequest();
      if (response === null) {
        onLogout();
        return;
      }
      setUser(response);
      setLoading(false);
    };

    getUser();
  }, []);

  const formatToMonthYear = (isoString) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'long',
    }).format(date);
  };

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
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1">
        
      <View className="flex-1 ">
        <View className="bg-gray-200 h-[200] mb-2">
        </View>
        <Text className="text-xl font-bold"> {(user?.firstName ?? '') + ' ' + (user?.lastName ?? '')}</Text>
        <View className="flex-row items-center">
          <Text className="color-gray-500">{"@" + user.username}</Text>
          <Text className="color-gray-500 m-1 mb-2">.</Text>
          <Text className="color-gray-500">{"Membre depuis " + formatToMonthYear(user.createdAt)}</Text>
        </View>
      </View>
      
      <View className="flex-1 items-center">
        <View className="w-[90%]">
        <Category
          title="Account"
          objects={
            [
              ["Préférences", () => {}],
              ["Profil", () => {}],
              ["Notifications", () => {}],
            ]
          }
        />
        <Category
          title="Assistance"
          objects={
          [
            ["Centre d'aide", () => {}],
            ["Nous contacter", () => {}],
            ["Mentions légales", () => {}],
          ]
          }/>
        <View className="flex-1">
          <TouchableOpacity 
            onPress={() => onLogout()}
            className="flex-1 p-4 rounded-2xl border-2 border-b-4 border-gray-300">
              <Text className="text-2l font-black color-[#45B6FE] text-center">
                DISCONNECT
              </Text>
          </TouchableOpacity>
        </View>
      </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}
