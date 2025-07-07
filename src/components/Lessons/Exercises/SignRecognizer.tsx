import AppView from "@/components/Ui/AppView";
import { ExerciseWithSign } from "@/types/LessonInterface";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { TouchableOpacity} from "react-native";
import Text from "@/components/Ui/Text";
import Recognize from "@/components/AIRecognizer/Recognize";
import { getSignByName } from "@/services/dictionnaryServices";
import { checkExercise } from "@/services/exercisesServices";
import { router } from "expo-router";
import Loading from "@/components/Ui/Loading";
import Image from "@/components/Ui/Image";

interface SignRecognizerProps {
    onNext: () => void;
    exercise: ExerciseWithSign
}

export interface responseStatus {
  word: string;
  valid: boolean;
  responded: boolean;
  mediaUrl?: string;
}


const SignRecognizer: React.FC<SignRecognizerProps> = ({ onNext, exercise }) => {
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

    // Reset l'état responded quand l'exercice change
    useEffect(() => {
        setResponded(false);
        setChecked(false);
    }, [exercise.id]);

    const submitResponse = useCallback(async (valid: boolean) => {
      if (responded) return; // Éviter les appels multiples

      setChecked(true);
      const result = await checkExercise(exercise?.id, {answer: exercise.sign.word.toLowerCase(), mutlipleChoice: true})
      if (result === null)
        router.back()
      setResponded(true);
      setResponses(prev =>
        prev.map(response =>
          response.word === exercise.sign.word.toLowerCase()
          ? { ...response, responded: true }
            : response
        )
      );
      setChecked(false);
    }, [exercise?.id, responded])


    return (
      <AppView className="flex-1">
        <AppView className="flex-1 flex-col justify-start pt-8">
          <Text className="text-2xl font-black ml-[2%] mb-8">{exercise.prompt}</Text>
          <AppView className="items-center justify-start flex-1">
            {!responded && (
              <Recognize
                model="alphabet2.0"
                sign_to_recognize={exercise.sign.word.toLowerCase()}
                onSuccess={submitResponse}
                className="w-[95%] aspect-square"
              />
            )}
            {responded && (
              <AppView className="absolute top-4 left-0 right-0 items-center z-10">
                <AppView className="bg-green-500 px-6 py-3 rounded-full shadow-lg">
                  <Text className="text-white font-bold text-lg">✓ Reconnaissance réussie !</Text>
                </AppView>
              </AppView>
            )}
          </AppView>
        </AppView>
        <AppView className="absolute bottom-6 left-0 w-full items-center">
          <TouchableOpacity
            className={`p-4 w-[90%] rounded-2xl ${ !responded ? 'bg-gray-400 opacity-50' : 'bg-duoGreen'}`}
            disabled={!responded} onPress={() => onNext()}>
              <Text className="text-2l font-black text-center">
                CONTINUER
              </Text>
          </TouchableOpacity>
        </AppView>
      </AppView>
    );
}

export default SignRecognizer;
