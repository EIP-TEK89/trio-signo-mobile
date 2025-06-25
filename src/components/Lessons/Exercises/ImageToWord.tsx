import AppView from "@/components/Ui/AppView";
import { checkExercise } from "@/services/exercisesServices";
import { ExerciseWithSign } from "@/types/LessonInterface";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { TouchableOpacity} from "react-native";
import Text from "@/components/Ui/Text";
import Image from "@/components/Ui/Image";

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
    const [responded, setResponded] = useState(false);
    const [checked, setChecked] = useState(false);
    const [responses, setResponses] = useState<responseStatus[]>([]);
    const exerciseOptions = useMemo(() => exercise.options, [exercise.options]);

    useEffect(() => {
      setResponses(exerciseOptions.map((word) => ({ word, valid: word === exercise.sign.word, responded: false })));
    }, [exerciseOptions, exercise.sign.word]);

    const CheckExercise = async (word: string) => {
        setChecked(true);
        const result = await checkExercise(exercise?.id, {answer: word, mutlipleChoice: true})
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

    return (
      <AppView className="flex-1">
      <AppView className="flex-1 flex-col gap-[5%]">
          <Text className="text-2xl font-bold ml-[2%]">{exercise.prompt}</Text>
          <AppView className="flex-1 items-center justify-center">
            <Image
              source={{ uri: exercise.sign.mediaUrl }}
              className="w-[60%] aspect-square rounded-full"
            />
          </AppView>
          <AppView className="flex-1 flex-row flex-wrap justify-center gap-9">
            {responses.map((response, index) => (
              <AppView key={index} 
              className={`w-[34%] aspect-[2] rounded-2xl bg-black-500 p-2 border-2 ${response.responded ? ( response.valid ? "border-[#45B6FE]" : 'border-red-500'): "border-gray-300"}`}>
                <TouchableOpacity key={index} disabled={responded} onPress={() => {!checked && CheckExercise(response.word)}} className="flex-1 rounded-full p-2 justify-center items-center">
                    <Text className="font-black color-[#45B6FE]">{response.word}</Text>
                </TouchableOpacity>
              </AppView>
            ))}
          </AppView>
      </AppView>
      <AppView className="absolute bottom-6 left-0 w-full items-center">
        <TouchableOpacity 
          className={`p-4 w-[90%] rounded-2xl ${ !responded ? 'bg-gray-400 opacity-50' : 'bg-[#45B6FE]'}`}
          disabled={!responded} onPress={() => onNext()}>
            <Text className="text-2l font-black text-center">
              CONTINUER
            </Text>
        </TouchableOpacity>
      </AppView>
    </AppView>
    );
}

export default ImageToWord;
