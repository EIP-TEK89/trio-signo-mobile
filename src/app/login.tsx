import { useAuth } from "@/context/AuthProvider";
import { router } from "expo-router";
import { useState } from "react";
import { Text } from "react-native";
import CustomTextInput from "@components/CustomTextInput";
import CustomButton from "@components/CustomButton";
import AppView from "@/components/Ui/AppView";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);
  const { onLogin } = useAuth();

  const login = async () => {
    const result = await onLogin(email, password);
    if (result && result.error) {
      setError(result.msg);
    }
    router.push("/(app)/(tabs)");
  };

  return (
    <AppView className="flex-1 bg-[#0D1117] p-5 justify-center items-center">
      <Text className="text-2xl font-semibold text-white mb-8">Connexion</Text>

      <CustomTextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <CustomTextInput
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {error && <Text className="text-red-500 mb-2">{error}</Text>}

      <CustomButton title="SE CONNECTER" onPress={login} />

      <CustomButton
        title="S'INSCRIRE"
        onPress={() => router.replace("/register")}
        style={{ backgroundColor: "#afafaf" }}
      />
    </AppView>
  );
}
