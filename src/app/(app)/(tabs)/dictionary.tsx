import { getSignsRequest } from "@/services/dictionnary";
import { Sign } from "@/types/LessonInterface";
import Block from "@components/Block";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, TouchableOpacity } from "react-native";

export default function Dictionary() {
  const [signs, setSigns] = useState<Sign[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadSigns = async () => {
      const response = await getSignsRequest();

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
      <SafeAreaView className="flex-1 bg-black">
        <Block className="flex-1 justify-center items-center">
          <Text className="text-white">Chargement du dictionnaire...</Text>
        </Block>
      </SafeAreaView>
    );
  }

  return (
    <Block className="flex-1 w-full px-4">
      <Text className="text-white text-2xl font-bold mt-6 mb-4 text-center">
        Dictionnaire des signes
      </Text>

      <ScrollView
        contentContainerClassName="flex-row flex-wrap justify-center gap-4 pb-10"
        showsVerticalScrollIndicator={false}
      >
        {signs.map((letter, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              router.push({
                pathname: "/(app)/sign/[sign]",
                params: { sign: letter.word },
              })
            }
            className="w-20 h-20 bg-white/10 rounded-xl justify-center items-center"
          >
            <Text className="text-white text-xl font-semibold">
              {letter.word}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Block>
  );
}
