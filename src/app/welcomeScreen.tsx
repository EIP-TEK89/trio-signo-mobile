import AppView from "@/components/Ui/AppView";
import Button from "@/components/Ui/Button";
import Text from "@/components/Ui/Text";
import { lightColors } from "@/constants/colors";
import { themeValues } from "@/constants/colorTheme";
import { useTheme } from "@/context/ThemeProvider";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function welcomeScreen() {

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
      <AppView className="flex-1 justify-center px-5" style={{ gap: 70 }}>
        <AppView style={{ gap: 20 }}>
          <Text className="text-3xl font-black text-center ">Tu as déjà un compte ?</Text>
          <Button
            title="SE CONNECTER"
            color="duoGreen"
            textColor="black"
            onPress={() => router.replace("/login")}
            style={{ backgroundColor: "#afafaf" }}
          />
        </AppView>
        <AppView className="border-b border-gray-300" />
        <AppView style={{ gap: 20 }}>
        <Text className="text-3xl font-black text-center mt-2">Tu viens d'arriver ?</Text>
        <Button
          title="C'EST PARTI !"
          onPress={() => router.replace("/register")}
          color="background"
          textColor={themeValues.light["--darkened-duo-green"]}
          className="border border-gray-400"
        />
        </AppView>
        </AppView>
    </SafeAreaView>
  );
}
