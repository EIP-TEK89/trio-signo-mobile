<<<<<<< HEAD
import AppText from "@/components/Ui/AppText";
import { getSignsRequest } from "@/services/dictionnary";
import { Sign } from "@/types/LessonInterface";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import AppView from "@/components/Ui/AppView";
import { SafeAreaView } from "react-native-safe-area-context";
=======
import { getSigns } from "@/services/dictionnary";
import { Sign } from "@/types/LessonInterface";
import Block from "@components/Block";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
>>>>>>> 89fc775 (feat: add new components and assets for lesson exercises)

export default function Dictionary() {
  const [signs, setSigns] = useState<Sign[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadSigns = async () => {
<<<<<<< HEAD
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
      <SafeAreaView>
      <AppView className="flex-1 justify-center items-center">
        <AppText className="text-white">Chargement du dictionnaire...</AppText>
      </AppView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
    <AppView className="flex-1 w-full px-4">
      <AppText className="text-2xl font-bold mt-6 mb-4">
        Apprendre les signes
      </AppText>
      <AppText className="text-base mb-4">
        Apprennez à connaitre les signes de la langue des signes française (LSF).
      </AppText>

      <ScrollView
        className="mt-5"
        showsVerticalScrollIndicator={false}
      >
        <AppView className="w-[95%] flex-row flex-wrap items-center mx-auto gap-6">
          {signs.map((letter, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                router.push({
                  pathname: "/(app)/sign/[sign]",
                  params: { sign: letter.word },
                })
              }
              className="w-20 h-20 rounded-xl justify-center items-center border-2 border-duoBlue"
            >
              <AppText className="text-white text-xl font-semibold">
                {letter.word}
              </AppText>
            </TouchableOpacity>
          ))}
          </AppView>
      </ScrollView>
    </AppView>
    </SafeAreaView>
  );
}
=======
      const response = await getSigns();
      setSigns(response);
      setLoading(false);
    }
    loadSigns();
  }, []);

  if (loading){
    return (
      <Block style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#fff' }}>Loading...</Text>
      </Block>
    );
  }
  return (
    <Block>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ padding: 10 }}
      >
      {signs.map((letter, index) => (
        <TouchableOpacity key={index} style={{ margin: 10 }} onPress={() => router.push({pathname: '/(app)/[sign]', params: {word: letter.word}})}>
          <Text>{letter.word}</Text>
        </TouchableOpacity>
      ))}
      </ScrollView>
    </Block>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
})
>>>>>>> 89fc775 (feat: add new components and assets for lesson exercises)
