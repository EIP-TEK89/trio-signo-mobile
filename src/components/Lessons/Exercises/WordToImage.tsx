import Block from "@/components/Block";
import CustomButton from "@/components/CustomButton";
import Title from "@/components/Title";
import { getSignImageRequest } from "@/services/dictionnary";
import { CheckExerciseRequest } from "@/services/lessons";
import { ExerciseWithSign } from "@/types/LessonInterface";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { responseStatus } from "./ImageToWord";

interface WordToImageProps {
    onNext: () => void;
    exercise: ExerciseWithSign
}

const WordToImage: React.FC<WordToImageProps> = ({ onNext, exercise }) => {
    const [loading, setLoading] = useState(true);
    const [responded, setResponded] = useState(false);
    const [checked, setChecked] = useState(false);
    const [responses, setResponses] = useState<responseStatus[]>([]);

    useEffect(() => {
        const loadSign = async () => {
          const responsesWithImage = await Promise.all(
                exercise.options.map(async (word) => {
                  const mediaUrl = await getSignImageRequest(word);
                  return ({word, valid: exercise.sign.word === word, responded: false, mediaUrl});
                })
            );
            setResponses(responsesWithImage);
            setLoading(false);
        };
        loadSign();
    }, []);

    const CheckExercise = async (word: string) => {
            setChecked(true);
            const result = await CheckExerciseRequest(exercise.id, word, true)
            if (result === null)
              router.back()
            if (result.isCorrect)
                setResponded(true);
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
      <View>
      <View className="flex flex-col items-center w-full h-full justify-around pt-[10%] pb-[30%]">
        <Text className="text-2xl font-bold text-center">{exercise.prompt}</Text>
          <View className="flex flex-row w-full flex-wrap justify-center gap-5">
            {responses.map((response, index) => (
              <View key={index} className="flex w-[45%] aspect-square">
                <TouchableOpacity key={index} onPress={() => { !checked && CheckExercise(response.word)}}
                disabled={responded}
                  >
                    <Image
                      source={{ uri: response.mediaUrl }}
                      className={`w-full h-full rounded-full ${response.responded && ( response.valid ? "border-2 border-[#45B6FE]" : 'border-2 border-red-500')}`}
                      alt={response.word}
                    />
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

export default WordToImage;
