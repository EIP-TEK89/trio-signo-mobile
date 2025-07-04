import AppView from "@/components/Ui/AppView";
import { checkExercise } from "@/services/exercisesServices";
import { ExerciseWithSign } from "@/types/LessonInterface";
import { router } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { TouchableOpacity} from "react-native";
import Text from "@/components/Ui/Text";
import { ImageRef } from "./WordToImage";
import Recognize from "@/components/AIRecognizer/Recognize";

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
    const [valid, setValid] = useState(false);

    useEffect(() => {
        setResponded(true)
    }, [valid]);

    return (
      <AppView className="flex-1">
      <AppView className="flex-1 flex-col gap-[5%]">
          <Text className="text-2xl font-bold ml-[2%]">{exercise.prompt}</Text>
          <Recognize
            model="alphabet"
            onSuccess={setValid}
            sign_to_recognize={exercise.sign.word}
          />
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

export default ImageToWord;
