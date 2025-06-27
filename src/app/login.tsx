import { useAuth } from "@/context/AuthProvider";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import Text from "@/components/Ui/Text";
import AppView from "@/components/Ui/AppView";
import Button from "@/components/Ui/Button";
import TextInput from "@/components/Ui/TextInput";
import { TouchableOpacity } from "react-native";
import BackArrowIcon from '@assets/CoursesJourney/Home/backArrow.svg';
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);
  const { onLogin } = useAuth();

  const login = useCallback(async () => {
    const result = await onLogin(email, password);
    if (result === null) {
      setError("Invalid email or password");
      return;
    }
  }, [email, password, onLogin]);

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
    <AppView className="flex-1">
      <AppView className="px-5">
        <TouchableOpacity onPress={() => router.replace("/welcomeScreen")} className="mt-5">
          <BackArrowIcon width={25} height={25} />
        </TouchableOpacity>
      </AppView>
      <AppView className="flex-1 justify-center px-5">
      <Text className="text-4xl font-semibold mb-8">Connexion</Text>

      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        className="w-full h-20 border border-b border-gray-400 bg-white/10 rounded-none rounded-t-2xl"
        keyboardType="email-address"
      />

      <TextInput
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        className="w-full h-20 mb-8 border border-b border-gray-400 bg-white/10 rounded-none rounded-b-2xl"
        secureTextEntry
      />
      {error && <Text className="text-red-500 mb-3 text-center">{error}</Text>}
      <Button title="SE CONNECTER" onPress={login} className="w-full" />
      </AppView>
    
    </AppView>
    </SafeAreaView>
  );
}
