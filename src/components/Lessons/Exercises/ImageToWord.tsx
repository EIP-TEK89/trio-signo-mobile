import Block from "@/components/Block";
import CustomButton from "@/components/CustomButton";
import Title from "@/components/Title";
import { CheckExerciseRequest } from "@/services/lessons";
import { ExerciseWithSign } from "@/types/LessonInterface";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ImageToWordProps {
    onNext: () => void;
    exercise: ExerciseWithSign
}

export interface responseStatus {
  word: string;
  valid: boolean;
  responded: boolean;
  mediaUrl?: string;
}

const ImageToWord: React.FC<ImageToWordProps> = ({ onNext, exercise }) => {
    const [loading, setLoading] = useState(false);
    const [responded, setResponded] = useState(false);
    const [checked, setChecked] = useState(false);
    const [responses, setResponses] = useState<responseStatus[]>([]);

    useEffect(() => {
      setResponses(exercise.options.map((word) => ({ word, valid: word === exercise.sign.word, responded: false })));
    }, []);

    const CheckExercise = async (word: string) => {
        setChecked(true);
        const result = await CheckExerciseRequest(exercise.id, word, true)
        if (result === null)
          router.back()
        if (result.isCorrect){
          setResponded(true);
        }
        responses.forEach((response) => {
            if (response.word === word) {
                response.responded = true;
            }
        });
        setChecked(false);
    }

    if (loading) {
        return (
          <Block style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#fff' }}>Loading...</Text>
          </Block>
        );
    }

    return (
      <View className="flex-1">
      <View className="flex-1 flex-col gap-[5%]">
          <Text className="text-2xl font-bold ml-[2%]">{exercise.prompt}</Text>
          <View className="flex-1 items-center justify-center">
            <Image
              source={{ uri: exercise.sign.mediaUrl }}
              className="w-[60%] aspect-square rounded-full"
            />
          </View>
          <View className="flex-1 flex-row flex-wrap justify-center gap-9">
            {responses.map((response, index) => (
              <View key={index} 
              className={`w-[34%] aspect-[2] rounded-2xl bg-black-500 p-2 border-2 ${response.responded ? ( response.valid ? "border-[#45B6FE]" : 'border-red-500'): "border-gray-300"}`}>
                <TouchableOpacity key={index} disabled={responded} onPress={() => {!checked && CheckExercise(response.word)}} className="flex-1 rounded-full p-2 justify-center items-center">
                    <Text className="font-black color-[#45B6FE]">{response.word}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
      </View>
      <View className="absolute bottom-6 left-0 w-full items-center">
        <TouchableOpacity 
          className={`p-4 w-[90%] rounded-2xl ${ !responded ? 'bg-gray-400 opacity-50' : 'bg-[#45B6FE]'}`}
          disabled={!responded} onPress={() => onNext()}>
            <Text className="text-2l font-black text-center">
              VALIDER
            </Text>
          </TouchableOpacity>
          </View>
      </View>
    );
}

export default ImageToWord;