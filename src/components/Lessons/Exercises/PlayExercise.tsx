import { getExerciseById } from "@/services/exercisesServices";
import { Exercise, ExerciseWithSign } from "@/types/LessonInterface";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import WordToImage from "./WordToImage";
import ImageToWord from "./ImageToWord";

interface PlayExerciseProps {
    exercise: Exercise;
    onNext: () => void;
}

const PlayExercise: React.FC<PlayExerciseProps> = ({exercise, onNext}) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [exerciseWithSign, setExercisesWithSign] = useState<ExerciseWithSign | null>(null);

    useEffect(() => {
        const loadExercise = async () => {
           
                const result = await getExerciseById(exercise?.id)
                if (result === null){
                    router.back()
                }
                setExercisesWithSign(result)
                setLoading(false);
        }
        loadExercise()
    }, [exercise?.id]);

    if (loading) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        )
    }

    return (
        <View className="flex-1">
            {exerciseWithSign.type === 'WORD_TO_IMAGE' &&
                <WordToImage onNext={() => onNext()} exercise={exerciseWithSign}/>
            }
            {exerciseWithSign.type === 'IMAGE_TO_WORD' &&
                <ImageToWord onNext={() => onNext()} exercise={exerciseWithSign}/>
            }
        </View>
    )
}

export default PlayExercise