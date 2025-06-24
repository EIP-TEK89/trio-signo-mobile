import AppView from "@/components/Ui/AppView";
import { getSignByName } from "@/services/dictionnaryServices";
import { checkExercise } from "@/services/exercisesServices";
import { ExerciseWithSign } from "@/types/LessonInterface";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import { responseStatus } from "./ImageToWord";
import AppText from "@/components/Ui/AppText";
import Loading from "@/components/Ui/Loading";

interface WordToImageProps {
    onNext: () => void;
    exercise: ExerciseWithSign
}

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
    }, [exerciseOptions, exercise.sign.word]);

    const submitResponse = async (word: string) => {
            setChecked(true);
            const result = await checkExercise(exercise?.id, {answer: word, mutlipleChoice: true})
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
          <Loading />
        );
      }

    return (
      <AppView className="flex-1">
        <AppView className="flex-1 flex-col gap-[15%]">
          <AppText className="text-2xl font-black ml-[2%]">{exercise.prompt}</AppText>
          <AppView className="flex-1 flex-row flex-wrap justify-center gap-5">
            {responses.map((response, index) => (
              <AppView key={index} className="w-[45%] aspect-square">
                <TouchableOpacity key={index} onPress={() => { !checked && submitResponse(response.word)}}
                disabled={responded} className="flex-1"
                  >
                    <Image
                      source={{ uri: response.mediaUrl }}
                      className={`flex-1 rounded-full ${response.responded && ( response.valid ? "border-2 border-[#45B6FE]" : 'border-2 border-red-500')}`}
                      alt={response.word}
                    />
                </TouchableOpacity>
              </AppView>
            ))}
          </AppView>
        </AppView>
        <AppView className="absolute bottom-6 left-0 w-full items-center">
          <TouchableOpacity 
            className={`p-4 w-[90%] rounded-2xl ${ !responded ? 'bg-gray-400 opacity-50' : 'bg-[#45B6FE]'}`}
            disabled={!responded} onPress={() => onNext()}>
              <AppText className="text-2l font-black text-center">
                VALIDER
              </AppText>
          </TouchableOpacity>
        </AppView>
      </AppView>
    );
}

export default WordToImage;
