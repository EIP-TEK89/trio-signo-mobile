import AppView from "@/components/Ui/AppView";
import { getSignByName } from "@/services/dictionnaryServices";
import { Sign } from "@/types/LessonInterface";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import CrossIcon from"@assets/Courses/cross.svg";
import Loading from "@/components/Ui/Loading";
import Image from "@/components/Ui/Image";
import Text from "@/components/Ui/Text";

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
    <AppView className="flex-1 items-center justify-center px-4 relative">
      <TouchableOpacity
        onPress={() => router.push("/(app)/(tabs)/dictionary")}
        className="absolute top-8 left-4 bg-white/10 rounded-xl p-2"
      >
        <CrossIcon width={30} height={30} />
      </TouchableOpacity>

      <Image
        source={signDisplayed?.mediaUrl}
        contentFit="cover"
        className="w-60 h-60 rounded-xl mb-6"
      />

      <Text className="text-4xl font-bold">
        {signDisplayed?.word}
      </Text>
    </AppView>
  );
}
