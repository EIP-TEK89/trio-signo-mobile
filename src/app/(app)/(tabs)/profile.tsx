import Category from "@/components/Profile/Category";
import AppText from "@/components/Ui/AppText";
import { useAuth } from "@/context/AuthProvider";
import { getUserRequest } from "@/services/user";
import { User } from "@/types/UserInterface";
import { useEffect, useState } from "react";

import {
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import AppView from "@/components/Ui/AppView";

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
        <AppView className="flex-1 justify-center items-center">
          <AppText className="text-white">Loading...</AppText>
        </AppView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 bg-background">
        
      <AppView className="flex-1 mb-6">
        <AppView className="bg-gray-200 h-[200] mb-2">
        </AppView>
        <AppText className="text-xl font-bold"> {(user?.firstName ?? '') + ' ' + (user?.lastName ?? '')}</AppText>
        <AppView className="flex-row items-center">
          <AppText className="color-gray-500">{"@" + user.username}</AppText>
          <AppText className="color-gray-500 m-1 mb-2">.</AppText>
          <AppText className="color-gray-500">{"Membre depuis " + formatToMonthYear(user.createdAt)}</AppText>
        </AppView>
      </AppView>
      
      <AppView className="flex-1 items-center">
        <AppView className="w-[90%]">
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
        <AppView className="flex-1 mt-6">
          <TouchableOpacity 
            onPress={() => onLogout()}
            className="flex-1 p-4 rounded-2xl border-2 border-b-4 border-gray-300">
              <AppText className="text-2l font-black color-[#45B6FE] text-center">
                SE DECONNECTER
              </AppText>
          </TouchableOpacity>
        </AppView>
      </AppView>
      </AppView>
      </ScrollView>
    </SafeAreaView>
  );
}
