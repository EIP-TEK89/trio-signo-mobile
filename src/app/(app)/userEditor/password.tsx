import AppView from "@/components/Ui/AppView";
import { router } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import BackArrowIcon from '@assets/Home/backArrow.svg';
import { SafeAreaView } from "react-native-safe-area-context";
import TextInput from "@/components/Ui/TextInput";
import Text from "@/components/Ui/Text";
import { useCallback, useState } from "react";
import Button from "@/components/Ui/Button";
import { changeUserPassword } from "@/services/userServices";

export default function PasswordEditorScreen() {
  const [previousPassword, setPreviousPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  const ChangePassword = useCallback(async () => {
    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      console.log("Les mots de passe ne correspondent pas");
      return;
    }
    const result = await changeUserPassword(previousPassword, newPassword)
    if (result === null) {
      setError("Mot de passe incorrect");
      console.log("Mot de passe incorrect");
      return;
    }
    router.back()
  }, [previousPassword, newPassword, confirmPassword, setError]);

  return (
    <SafeAreaView className="flex-1 bg-background">
    <AppView className="px-4 mt-5">
      <TouchableOpacity onPress={() => router.navigate("/(app)/(tabs)/profile")} className="">
        <BackArrowIcon width={30} height={30} />
       </TouchableOpacity>
       
    </AppView>
    <AppView className="flex-1 items-center mt-5">
      <AppView className="flex-1 w-[95%] gap-3">
        <AppView>
          <Text className="text-xl font-black mt-5 mb-2">Mot de passe actuel</Text>
          <TextInput
            placeholder="Entrer votre mot de passe actuel"
            onPress={() => router}
            value={previousPassword}
            onChangeText={setPreviousPassword}
            type="password"
            secureTextEntry
            className="w-full h-16 border border-b border-gray-400 bg-white/10 rounded-none rounded-2xl"
          />
        </AppView>
        <AppView>
          <Text className="text-xl font-black mt-5 mb-2">Nouveau mot de passe</Text>
          <TextInput
            placeholder="Nouveau mot de passe"
            value={newPassword}
            onChangeText={setNewPassword}
            type="password"
            secureTextEntry
            className="w-full h-16 border border-b border-gray-400 bg-white/10 rounded-none rounded-2xl"
          />
        </AppView>
        <AppView>
          <Text className="text-xl font-black mt-5 mb-2">Nouveau mot de passe</Text>
          <TextInput
            placeholder="Confirmer le mot de passe"
            onPress={() => router}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            type="password"
            secureTextEntry
            className="w-full h-16 border border-b border-gray-400 bg-white/10 rounded-none rounded-2xl"
          />
        </AppView>
      
      
      <View className="mt-12">
        {error && <Text className="text-red-500 text-center">{error}</Text>}
        <Button title="Changer le mot de passe" onPress={() => ChangePassword()} className="border-2 border-duoGreen bg-background w-[95%]  mx-auto"/>
      </View>
      </AppView>
    </AppView>
    </SafeAreaView>
  );
}
