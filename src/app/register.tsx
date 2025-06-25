import { useAuth } from "@/context/AuthProvider";
import { useCallback, useState } from "react";
import { router } from "expo-router";
import Text from "@/components/Ui/Text";
import AppView from "@/components/Ui/AppView";
import TextInput from "@/components/Ui/TextInput";
import Button from "@/components/Ui/Button";
import ProgressBar from "@/components/Ui/ProgressBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import BackArrowIcon from '@assets/CoursesJourney/Home/backArrow.svg';
import UserConditions from "@/components/Authentification/UserConditions";

enum Step {
  Username = 0,
  Email = 1,
  Password = 2,
  Completed = 3,
}

export default function LoginScreen() {
  // Initialize the step state to the first step
  const [step, setStep] = useState<number>(Step.Username);

  // Access the authentication context
  const { onRegister } = useAuth();

  // State variables for user input
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Error state to handle registration errors
  const [error, setError] = useState<string | undefined>(undefined);

  const register = useCallback(async () => {
    const result = await onRegister!(username, email, password);
    if (result && result.error) {
      setError(result.msg);
    }
    router.push("/(app)/(tabs)");
  }, [onRegister, username, email, password]);

  const checkEmailValidity = useCallback((email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (re.test(email)) {
      return true;
    }
    setError("L'email n'est pas valide");
    return false;
  }, []);

  const checkPasswordValidity = useCallback((password: string, confirmPassword: string): boolean => {
    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return false;
    }
    return true;
  }, []);

  const goNext = useCallback(() => {
    if (step === Step.Email && !checkEmailValidity(email)) {
      return;
    }
    if (step === Step.Password && !checkPasswordValidity(password, confirmPassword)) {
      return;
    }
    if (step < Step.Completed) {
      setStep(step + 1);
    } else {
      register();
    }
  }, [step, email, password, confirmPassword, register, checkEmailValidity, checkPasswordValidity]);

  const goBack = useCallback(() => {
    setError(undefined);
    if (step > Step.Username) {
      setStep(step - 1);
    } else {
      router.replace("/welcomeScreen");
    }
  }, [step]);

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
      <AppView className="flex-1 px-5">
        <AppView className="flex-row items-center gap-5 mt-5 mb-3">
          <TouchableOpacity onPress={goBack} className="">
            <BackArrowIcon width={25} height={25} />
          </TouchableOpacity>
          <ProgressBar index={step} maxLength={Step.Completed} color="duoBlue"/>
        </AppView>
        {step === Step.Username && (
          <AppView className="flex-1">
            <Text className="text-3xl font-black text-white mt-5 mb-8"> Quel est ton nom?</Text>
            <AppView className="flex-1 flex-col">
              <TextInput
                placeholder="Prénom"
                value={firstName}
                onChangeText={setFirstName}
                className="w-full h-[9%] border border-b border-gray-400 bg-white/10 rounded-none rounded-t-2xl"
              />
              <TextInput
                placeholder="Nom"
                value={lastName}
                onChangeText={setLastName}
                className="w-full h-[9%] border border-b border-gray-400 bg-white/10 rounded-none rounded-b-2xl mb-8"
              />
              <Button title="CONTINUER" color="duoBlue" onPress={() => {goNext();}} disabled={!(firstName !== "" && lastName !== "")} />
            </AppView>
          </AppView>
        )}
      {step === Step.Email && (
      <AppView className="flex-1">
        <Text className="text-3xl font-black text-white mt-5 mb-8">Maintenant entre un nom d&apos;utilisateur et email</Text>
        <TextInput
          placeholder="Identifiant"
          value={username}
          onChangeText={setUsername}
          className="w-full h-[9%] border border-b border-gray-400 bg-white/10 rounded-none rounded-t-2xl"
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          className="w-full h-[9%] border border-b border-gray-400 bg-white/10 rounded-none rounded-b-2xl mb-8"
        />
        {error && <Text className="text-red-500 mb-3 text-center">{error}</Text>}
        <Button title="CONTINUER" color="duoBlue" onPress={() => {goNext();}} disabled={!(username !== "" && email !== "")} />
      </AppView>
      )}
      {step === Step.Password && (
        <AppView className="flex-1">
          <Text className="text-3xl font-black text-white mt-5 mb-8">Choisis un mot de passe</Text>
          <TextInput
            placeholder="Mot de passe"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            className="w-full h-[9%] border border-b border-gray-400 bg-white/10 rounded-none rounded-t-2xl"
          />
          <TextInput
            placeholder="Répéter le mot de passe"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            className="w-full h-[9%] border border-b border-gray-400 bg-white/10 rounded-none rounded-b-2xl mb-8"
          />
          {error && <Text className="text-red-500 mb-3 text-center">{error}</Text>}
          <Button title="CREER TON PROFIL" color="duoBlue" onPress={() => {goNext();}} disabled={!(password !== "" && confirmPassword !== "")} />
      </AppView>
      )}
      <UserConditions />
    </AppView>
    </SafeAreaView>
  );
}
