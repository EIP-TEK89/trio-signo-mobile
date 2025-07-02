import AppView from "@/components/Ui/AppView";
import { getSignByName } from "@/services/dictionnaryServices";
import { Sign } from "@/types/LessonInterface";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import BackArrowIcon from '@assets/Home/backArrow.svg';
import Loading from "@/components/Ui/Loading";
import Image from "@/components/Ui/Image";
import Text from "@/components/Ui/Text";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignScreen() {
  const { sign } = useLocalSearchParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [signDisplayed, setSignDisplayed] = useState<Sign | undefined>(
    undefined
  );

  useEffect(() => {
    const loadSign = async () => {
      const response = await getSignByName(sign as string);
      if (response === null) {
        router.back();
        return;
      }
      setSignDisplayed(response[0]);
      setLoading(false);
    };
    loadSign();
  }, [sign]);

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <AppView className="w-full flex-row items-center justify-center h-16 mb-3 gap-2 border-b border-gray-800/50">
          <Image source={require("@assets/logo.png")} contentFit="contain"
            className="w-10 aspect-square bg-red"/>
          <Text className="text-green-400 text-2xl font-bold">TrioSigno</Text>
        </AppView>
        <TouchableOpacity
        onPress={() => router.push("/(app)/(tabs)/dictionary")}
        className="pl-5 rounded-xl p-2"
      >
        <BackArrowIcon width={30} height={30} />
      </TouchableOpacity>
    <AppView className="mt-[35%] gap-3 items-center justify-center px-4 relative">
      <Text className="text-green-400 text-2xl font-medium mb-2">
        Voici le signe:
      </Text>
      <Text className="text-4xl font-bold"> {signDisplayed?.word} </Text>
      <Image
        source={signDisplayed?.mediaUrl}
        contentFit="cover"
        className="w-60 h-60 rounded-xl mb-6"
      />
    </AppView>
    </SafeAreaView>
  );
}
