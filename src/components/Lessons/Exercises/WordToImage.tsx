import AppView from "@/components/Ui/AppView";
import { getSignByName } from "@/services/dictionnaryServices";
import { checkExercise } from "@/services/exercisesServices";
import { ExerciseWithSign } from "@/types/LessonInterface";
import { router } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { TouchableOpacity } from "react-native";
import { responseStatus } from "./ImageToWord";
import Text from "@/components/Ui/Text";
import Loading from "@/components/Ui/Loading";
import Image from "@/components/Ui/Image";

interface WordToImageProps {
    onNext: () => void;
    exercise: ExerciseWithSign
}

export const ImageRef = React.memo(({uri, className} : {uri: string, className: string}) => <Image source={{ uri: uri }} className={className}/>)

ImageRef.displayName = "ImageRef"

const WordToImage: React.FC<WordToImageProps> = ({ onNext, exercise }) => {
    const [loading, setLoading] = useState(true);
    const [responded, setResponded] = useState(false);
    const [checked, setChecked] = useState(false);
    const [responses, setResponses] = useState<responseStatus[]>([]);
    const exerciseOptions = useMemo(() => exercise.options, [exercise.options]);

    useEffect(() => {
        const loadSign = async () => {
          const responsesWithImage = await Promise.all(
                exerciseOptions.map(async (word) => {
                  const result = await getSignByName(word);
                  const mediaUrl = result ? result[0].mediaUrl : ''; 
                  return ({word, valid: exercise.sign.word === word, responded: false, mediaUrl});
                })
            );
            setResponses(responsesWithImage);
            setLoading(false);
        };
        loadSign();
    }, [exercise.sign.word, exerciseOptions]);

    const submitResponse = useCallback(async (word: string) => {
      setChecked(true);
      const result = await checkExercise(exercise?.id, {answer: word, mutlipleChoice: true})
      if (result === null)
        router.back()
      setResponded(true);
      setResponses(prev =>
        prev.map(response =>
          response.word === word
          ? { ...response, responded: true }
            : response
        )
      );
      setChecked(false);
    }, [exercise?.id])
    
    if (loading) {
      return (
        <Loading />
      );
    }

    return (
      <AppView className="flex-1">
        <AppView className="flex-1 flex-col gap-[15%]">
          <Text className="text-2xl font-black ml-[2%]">{exercise.prompt}</Text>
          <AppView className="flex-1 flex-row flex-wrap justify-center gap-5">
            {responses.map((response, index) => (
              <AppView key={index} className="w-[45%] aspect-square">
                <TouchableOpacity key={index} onPress={() => { !checked && submitResponse(response.word)}}
                 className={`flex-1 rounded-full ${response.responded && ( response.valid ? "border-2 border-duoGreen" : 'border-2 border-red-500')}`}>
                  <ImageRef
                    uri={response.mediaUrl}
                    className="flex-1 rounded-full"
                  />
                </TouchableOpacity>
              </AppView>
            ))}
          </AppView>
        </AppView>
        <AppView className="absolute bottom-6 left-0 w-full items-center">
          <TouchableOpacity 
            className={`p-4 w-[90%] rounded-2xl ${ !responded ? 'bg-gray-400 opacity-50' : 'bg-duoGreen'}`}
            disabled={!responded} onPress={() => onNext()}>
              <Text className="text-2l font-black text-center">
                VALIDER
              </Text>
          </TouchableOpacity>
        </AppView>
      </AppView>
    );
}

export default WordToImage;
