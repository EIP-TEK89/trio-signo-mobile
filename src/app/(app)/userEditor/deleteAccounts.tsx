import AppView from "@/components/Ui/AppView";
import { router } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import BackArrowIcon from '@assets/Home/backArrow.svg';
import { SafeAreaView } from "react-native-safe-area-context";
import TextInput from "@/components/Ui/TextInput";
import Text from "@/components/Ui/Text";
import { useCallback, useState } from "react";
import Button from "@/components/Ui/Button";
import { deleteCurrentUser } from "@/services/userServices";
import { useAuth } from "@/context/AuthProvider";

export default function PasswordEditorScreen() {
  const { onLogout } = useAuth();
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  const DeleteAccount = useCallback(async () => {
    const result = await deleteCurrentUser(password)
    if (result === null) {
      setError("Mot de passe incorrect");
      return;
    }
    onLogout();
  }, [password, setError, onLogout]);

  return (
    <SafeAreaView className="flex-1 bg-background">
    <AppView className="px-4 mt-5">
      <TouchableOpacity onPress={() => router.navigate("/(app)/(tabs)/profile")} className="">
        <BackArrowIcon width={30} height={30} />
       </TouchableOpacity>
       
    </AppView>
    <AppView className="flex-1 items-center mt-20">
      <AppView className="flex-1 w-[95%] gap-6">
        <AppView>
          <Text className="text-xl text-center font-black mt-5 mb-12">Veuillez entrer votre mot de passe actuel pour confirme la suppression du compte</Text>
          <TextInput
            placeholder="Entrer votre mot de passe actuel"
            onPress={() => router}
            value={password}
            onChangeText={setPassword}
            type="password"
            secureTextEntry
            className="w-full h-16 border border-b border-gray-400 bg-white/10 rounded-none rounded-2xl"
          />
        </AppView>
      
      
      <View className="mt-12">
        {error && <Text className="text-red-500 text-center">{error}</Text>}
        <Button title="Je veux supprimer mon compte" onPress={() => DeleteAccount()} className="border-2 border-red-500 bg-background w-[95%]  mx-auto"/>
      </View>
      </AppView>
    </AppView>
    </SafeAreaView>
  );
}
