import AppView from "@/components/Ui/AppView";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
import BackArrowIcon from '@assets/Home/backArrow.svg';
import { SafeAreaView } from "react-native-safe-area-context";
import TextInput from "@/components/Ui/TextInput";
import Text from "@/components/Ui/Text";

export default function PasswordEditorScreen() {
  // const { authState } = useAuth()
  // const [previousPassword, setPreviousPassword] = useState<string>(authState.user.firstName)
  // const [newPassword, setNewPassword] = useState<string>(authState.user.lastName)
  // const [confirmPassword, setConfirmPassword] = useState<string>(authState.user.lastName)
  // const [signDisplayed, setSignDisplayed] = useState<Sign | undefined>(
  //   undefined
  // );

  // const ChangePassword = useCallback(async () => {
    
  // }, [])

  return (
    <SafeAreaView className="flex-1 bg-background">
    <AppView className="px-4 mt-5">
      <TouchableOpacity onPress={() => router.navigate("/(app)/(tabs)/profile")} className="">
        <BackArrowIcon width={30} height={30} />
       </TouchableOpacity>
       
    </AppView>
    <AppView className="flex-1 items-center">
      <AppView className="flex-1 w-[95%]">
        <AppView>
          <Text className="text-xl font-black mt-5 mb-2">Mot de passe</Text>
          <TextInput
            placeholder="Mot de passe"
            onPress={() => router}
            value={"password"}
            secureTextEntry
            className="w-full h-16 border border-b border-gray-400 bg-white/10 rounded-none rounded-2xl"
          />
        </AppView>
      </AppView>
    </AppView>
    </SafeAreaView>
  );
}
