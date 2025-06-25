import Category from "@/components/Profile/Category";
import Text from "@/components/Ui/Text";
import { useAuth } from "@/context/AuthProvider";
import { useCallback } from "react";

import {
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import AppView from "@/components/Ui/AppView";

export default function ProfileScreen() {
  const { onLogout, authState } = useAuth();
  const user = authState.user;

  const formatToMonthYear = useCallback((isoString) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'long',
    }).format(date);
  }, []);


  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 bg-background">
        
      <AppView className="flex-1 mb-6">
        <AppView className="bg-gray-200 h-[200] mb-2">
        </AppView>
        <Text className="text-xl font-bold"> {(user?.firstName ?? '') + ' ' + (user?.lastName ?? '')}</Text>
        <AppView className="flex-row items-center">
          <Text className="color-gray-500">{"@" + user.username}</Text>
          <Text className="color-gray-500 m-1 mb-2">.</Text>
          <Text className="color-gray-500">{"Membre depuis " + formatToMonthYear(user.createdAt)}</Text>
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
              <Text className="text-2l font-black color-[#45B6FE] text-center">
                SE DECONNECTER
              </Text>
          </TouchableOpacity>
        </AppView>
      </AppView>
      </AppView>
      </ScrollView>
    </SafeAreaView>
  );
}
