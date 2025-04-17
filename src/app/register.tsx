import { useAuth } from "@context/AuthContext";
import { useState } from "react";
import { Text, View } from "react-native";
import CustomTextInput from "@components/CustomTextInput";
import CustomButton from "@components/CustomButton";
import { router } from "expo-router";
import Block from "@/components/Block";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);
  const { onRegister } = useAuth();

  const register = async () => {
    const result = await onRegister!(username, email, password);
    if (result && result.error) {
      setError(result.msg);
    }
    router.push("/(app)/(tabs)");
  };

  return (
    <Block className="flex-1 justify-center items-center px-5 bg-white dark:bg-black">
      <CustomTextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      <CustomTextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <CustomTextInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {error && <Text className="text-red-500 mb-3">{error}</Text>}

      <CustomButton title="S'inscrire" onPress={register} />

      <CustomButton
        title="SE CONNECTER"
        onPress={() => router.replace("/login")}
        style={{ backgroundColor: "#afafaf" }}
      />
    </Block>
  );
}
