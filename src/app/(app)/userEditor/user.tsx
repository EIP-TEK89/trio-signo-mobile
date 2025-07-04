import AppView from "@/components/Ui/AppView";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import BackArrowIcon from '@assets/Home/backArrow.svg';
import { useAuth } from "@/context/AuthProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import TextInput from "@/components/Ui/TextInput";
import Text from "@/components/Ui/Text";

export default function UserEditorScreen() {
  const { authState, onUpdate } = useAuth()
  const [firstName, setFirstName] = useState<string>(authState.user?.firstName)
  const [lastName, setLastName] = useState<string>(authState.user?.lastName)
  const [username, setUsername] = useState<string>(authState.user?.username)
  const [email, setEmail] = useState<string>(authState.user?.email)

  useEffect(() => {
    if (authState.user === null)
      router.navigate("/(app)/(tabs)/profile")
  }, [authState.user])

  const goBack = useCallback(async () => {
    await onUpdate(username, email, firstName, lastName, authState.user?.avatarUrl)
    router.navigate("/(app)/(tabs)/profile")
  }, [username, email, firstName, lastName, authState.user?.avatarUrl, onUpdate])

  return (
    <SafeAreaView className="flex-1 bg-background">
    <AppView className="px-4 mt-5">
      <TouchableOpacity onPress={() => goBack()} className="">
        <BackArrowIcon width={30} height={30} />
       </TouchableOpacity>
    </AppView>
    <AppView className="flex-1 items-center mt-5">
      <AppView className="flex-1 w-[95%] gap-3">
        <AppView>
          <Text className="text-xl font-black mt-5 mb-2">Prénom</Text>
          <TextInput
            placeholder="Prénom"
            value={firstName}
            onChangeText={setFirstName}
            className="w-full h-16 border border-b border-gray-400 bg-white/10 rounded-none rounded-2xl"
          />
        </AppView>
        <AppView>
          <Text className="text-xl font-black mt-5 mb-2">Nom</Text>
          <TextInput
            placeholder="Nom"
            value={lastName}
            onChangeText={setLastName}
            className="w-full h-16 border border-b border-gray-400 bg-white/10 rounded-none rounded-2xl"
          />
        </AppView>
        <AppView>
          <Text className="text-xl font-black mt-5 mb-2">Identifiant</Text>
          <TextInput
            placeholder="Identifiant"
            value={username}
            onChangeText={setUsername}
            className="w-full h-16 border border-b border-gray-400 bg-white/10 rounded-none rounded-2xl"
          />
        </AppView>
        <AppView>
          <Text className="text-xl font-black mt-5 mb-2">Email</Text>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            className="w-full h-16 border border-b border-gray-400 bg-white/10 rounded-none rounded-2xl"
          />
        </AppView>
        {/* <AppView>
          <Text className="text-xl font-black mt-5 mb-2">Mot de passe</Text>
          <TouchableOpacity onPress={() => router.navigate("/(app)/userEditor/password")}
            className="">
              <AppView className="bg-white/10 rounded-xl justify-center h-16 w-full px-4 py-3 border border-gray-400">
                <Text>*******</Text>
              </AppView>
          </TouchableOpacity>
        </AppView> */}
      </AppView>
    </AppView>
    </SafeAreaView>
  );
}
