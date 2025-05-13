import Block from "@/components/Block";
import { getSignRequest } from "@/services/dictionnary";
import { Sign } from "@/types/LessonInterface";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, Image, TouchableOpacity } from "react-native";
import CrossIcon from"@assets/Courses/cross.svg";

export default function SignScreen() {
  const { sign } = useLocalSearchParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [signDisplayed, setSignDisplayed] = useState<Sign | undefined>(
    undefined
  );

  useEffect(() => {
    const loadSign = async () => {
      const response = await getSignRequest(sign as string);
      if (response === null) {
        router.back();
        return;
      }
      setSignDisplayed(response[0]);
      setLoading(false);
    };
    loadSign();
  }, []);

  if (loading) {
    return (
      <Block className="flex-1 justify-center items-center">
        <Text className="text-white">Chargement...</Text>
      </Block>
    );
  }

  return (
    <Block className="flex-1 items-center justify-center px-4 relative">
      <TouchableOpacity
        onPress={() => router.push("/(app)/(tabs)/dictionary")}
        className="absolute top-8 left-4 bg-white/10 rounded-xl p-2"
      >
        <CrossIcon width={30} height={30} />
      </TouchableOpacity>

      <Image
        source={{ uri: signDisplayed?.mediaUrl }}
        className="w-60 h-60 rounded-xl mb-6"
      />

      <Text className="text-white text-4xl font-bold">
        {signDisplayed?.word}
      </Text>
    </Block>
  );
}
