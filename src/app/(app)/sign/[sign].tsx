import AppView from "@/components/Ui/AppView";
import { getSignByName } from "@/services/dictionnaryServices";
import { Sign } from "@/types/LessonInterface";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import BackArrowIcon from '@assets/Home/backArrow.svg';
import Loading from "@/components/Ui/Loading";
import Image from "@/components/Ui/Image";
import Text from "@/components/Ui/Text";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/Ui/Button";
import Recognize from "@/components/AIRecognizer/Recognize";

export default function SignScreen() {
  const { sign } = useLocalSearchParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [practice, setPractice] = useState<boolean>(false);
  const [signDisplayed, setSignDisplayed] = useState<Sign | undefined>(
    undefined
  );
  const [sucess, setSuccess] = useState<boolean>(false);

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

  useEffect(() => {
    console.log("Success changed:", sucess);
  }, [sucess]);


  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
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
    <AppView className="flex-1 mt-[8%] gap-2  px-4">
      { !practice ?
      <View className="flex-1 items-center gap-5 ">
      <Text className="text-green-400 text-2xl font-medium mb-2">
        Voici le signe:
      </Text>
      <Text className="text-4xl font-bold mb-14"> {signDisplayed?.word} </Text>
      <Image
        source={signDisplayed?.mediaUrl}
        contentFit="cover"
        className="w-72 h-72 rounded-xl mb-6"
      />

      <Button title="Reproduire" onPress={() => setPractice(true)} className="absolute bottom-5 w-[95%] "/>
      </View>
      :
      <View className="flex-1 items-center gap-3">
        <Text className="text-6xl font-bold"> {signDisplayed?.word} </Text>
        <Text className="text-green-400 text-2xl font-medium mb-2">
          Essayez de reproduire le signe!
        </Text>
        {!sucess
        ? <Recognize model="alphabet2.0" sign_to_recognize={signDisplayed?.word.toLowerCase()} onSuccess={setSuccess} className="w-[95%] aspect-square"/>
        : <View className="flex-1 justify-center"><Text className="text-center text-6xl">Bien Joué !</Text></View>}
        <Button title="Revoir le signe" onPress={() => {setPractice(false); setSuccess(false)}} className="absolute bottom-5 w-[95%] bg-background border border-duoGreen"/>
      </View>


    }

    </AppView>
    </SafeAreaView>
  );
}
