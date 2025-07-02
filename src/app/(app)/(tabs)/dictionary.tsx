import { getAllSigns } from "@/services/dictionnaryServices";
import { Sign } from "@/types/LessonInterface";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import AppView from "@/components/Ui/AppView";
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "@/components/Ui/Loading";
import Text from "@/components/Ui/Text";
import Image from "@/components/Ui/Image";

export default function Dictionary() {
  const [signs, setSigns] = useState<Sign[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadSigns = async () => {
      const response = await getAllSigns();
      const sorted = response.sort((a, b) =>
        a.word.localeCompare(b.word, "fr", { sensitivity: "base" })
      );
      setSigns(sorted);
      setLoading(false);
    };

    loadSigns();
  }, []);


  if (loading) {
    return (
        <Loading />
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      {/* Header */}
        <AppView className="w-full flex-row items-center justify-center h-16 mb-3 gap-2 border-b border-gray-800/50">
          <Image source={require("@assets/logo.png")} contentFit="contain"
            className="w-10 aspect-square bg-red"/>
          <Text className="text-green-400 text-2xl font-bold">TrioSigno</Text>
        </AppView>
    <AppView className="flex-1 w-full px-4">
      <Text className="text-2xl font-bold mt-6 mb-4">
        Apprendre les signes
      </Text>
      <Text className="text-base mb-4">
        Apprennez à connaitre les signes de la langue des signes française (LSF).
      </Text>

      <ScrollView
        className="mt-5 mx-auto w-[95%]"
        showsVerticalScrollIndicator={false}
      >
        <AppView className="flex-row flex-wrap items-center justify-center gap-6">
          {signs.map((letter, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                router.push({
                  pathname: "/(app)/sign/[sign]",
                  params: { sign: letter.word },
                })
              }
              className="w-20 h-20 rounded-xl justify-center items-center border-2 border-duoGreen"
            >
              <Text className="text-xl font-semibold">
                {letter.word}
              </Text>
            </TouchableOpacity>
          ))}
          </AppView>
      </ScrollView>
    </AppView>
    </SafeAreaView>
  );
}
