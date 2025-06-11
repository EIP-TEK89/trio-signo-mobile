<<<<<<< HEAD
import AppView from "@/components/Ui/AppView";
import CustomButton from "@/components/CustomButton";
import Title from "@/components/Title";
import { CheckExerciseRequest } from "@/services/lessons";
import { ExerciseWithSign } from "@/types/LessonInterface";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity} from "react-native";
import AppText from "@/components/Ui/AppText";

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
=======
import Block from "@/components/Block";
import CustomButton from "@/components/CustomButton";
import Title from "@/components/Title";
import { ExerciseWithSign } from "@/types/LessonInterface";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ImageToWordProps extends ExerciseWithSign {
    onFail: () => void;
    onNext: () => void;
}

const ImageToWord: React.FC<ImageToWordProps> = ({ onFail, onNext, ...props }) => {
    const [loading, setLoading] = useState(true);
    const [responded, setResponded] = useState(false);

    const CheckExercise = async (word: string) => {
        setLoading(true);
        if (word !== props.sign.word)
            onFail();
        else
            setResponded(true);
        setLoading(false);
        onNext();
>>>>>>> 89fc775 (feat: add new components and assets for lesson exercises)
    }

    if (loading) {
        return (
<<<<<<< HEAD
          <AppView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <AppText style={{ color: '#fff' }}>Loading...</AppText>
          </AppView>
=======
          <Block style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#fff' }}>Loading...</Text>
          </Block>
>>>>>>> 89fc775 (feat: add new components and assets for lesson exercises)
        );
    }

    return (
<<<<<<< HEAD
      <AppView className="flex-1">
      <AppView className="flex-1 flex-col gap-[5%]">
          <AppText className="text-2xl font-bold ml-[2%]">{exercise.prompt}</AppText>
          <AppView className="flex-1 items-center justify-center">
            <Image
              source={{ uri: exercise.sign.mediaUrl }}
              className="w-[60%] aspect-square rounded-full"
            />
          </AppView>
          <AppView className="flex-1 flex-row flex-wrap justify-center gap-9">
            {responses.map((response, index) => (
              <AppView key={index} 
              className={`w-[34%] aspect-[2] rounded-2xl bg-black-500 p-2 border-2 ${response.responded ? ( response.valid ? "border-[#45B6FE0]" : 'border-red-500'): "border-gray-300"}`}>
                <TouchableOpacity key={index} disabled={responded} onPress={() => {!checked && CheckExercise(response.word)}} className="flex-1 rounded-full p-2 justify-center items-center">
                    <AppText className="font-black color-[#45B6FE]">{response.word}</AppText>
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

export default ImageToWord;
=======
      <Block style={styles.courses}>
          <Title>{props.prompt}</Title>
          <View>
            <Image
              source={{ uri: props.sign.mediaUrl }}
              style={styles.image}
            />
          </View>
          <View style={styles.container}>
            {props.options.map((word, index) => (
                <TouchableOpacity key={index} onPress={() => {CheckExercise}}>
                    <Text>{word}</Text>
                </TouchableOpacity>
            ))}
          </View>
          <CustomButton disabled={!responded} title={"VALIDER"} onPress={() => onNext}/>
      </Block>
    );
}

export default ImageToWord;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header : {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    color: 'white',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
  },
  body: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
 },
 courses: {
    width: '100%',
    marginTop: 60,
    gap: 20,
    alignItems: 'center',
},
  choicesList: {
    width: '100%',
    justifyContent: 'center',
    gap: 20,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  icon: {
    width: 30,
    height: 30,
  },
  stepContainer: {
    backgroundColor: 'purple',
    color: 'white',
    alignItems: 'center',
  },

  Camera: {
    width: 300,
    height: 300,
    borderRadius: 200,
    borderWidth: 1,
  },
});
>>>>>>> 89fc775 (feat: add new components and assets for lesson exercises)
