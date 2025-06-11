<<<<<<< HEAD
import AppView from "@/components/Ui/AppView";
import CustomButton from "@/components/CustomButton";
import Title from "@/components/Title";
import { getSignImageRequest } from "@/services/dictionnary";
import { CheckExerciseRequest } from "@/services/lessons";
import { ExerciseWithSign } from "@/types/LessonInterface";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Image, StyleSheet, TouchableOpacity } from "react-native";
import { responseStatus } from "./ImageToWord";
import AppText from "@/components/Ui/AppText";

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
=======
import Block from "@/components/Block";
import CustomButton from "@/components/CustomButton";
import Title from "@/components/Title";
import { getSignImage } from "@/services/dictionnary";
import { ExerciseWithSign } from "@/types/LessonInterface";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface WordToImageProps extends ExerciseWithSign {
    onFail: () => void;
    onNext: () => void;
}

const WordToImage: React.FC<WordToImageProps> = ({ onFail, onNext, ...props }) => {
    const [loading, setLoading] = useState(true);
    const [signsImages, setSignsImages] = useState<string[]>([]);
    const [responded, setResponded] = useState(false);

    useEffect(() => {
        const loadSign = async () => {
            const images = await Promise.all(
                props.options.map(async (word) => {
                    return getSignImage(word);
                })
            );
            setSignsImages(images);
>>>>>>> 89fc775 (feat: add new components and assets for lesson exercises)
            setLoading(false);
        };
        loadSign();
    }, []);

    const CheckExercise = async (word: string) => {
<<<<<<< HEAD
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
          <AppView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <AppText style={{ color: '#fff' }}>Loading...</AppText>
          </AppView>
=======
        setLoading(true);
        if (word !== props.sign.word)
            onFail();
        else
            setResponded(true);
        setLoading(false);
        onNext();
    }

    if (loading) {
        return (
          <Block style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#fff' }}>Loading...</Text>
          </Block>
>>>>>>> 89fc775 (feat: add new components and assets for lesson exercises)
        );
      }

    return (
<<<<<<< HEAD
      <AppView className="flex-1">
        <AppView className="flex-1 flex-col gap-[15%]">
          <AppText className="text-2xl font-black ml-[2%]">{exercise.prompt}</AppText>
          <AppView className="flex-1 flex-row flex-wrap justify-center gap-5">
            {responses.map((response, index) => (
              <AppView key={index} className="w-[45%] aspect-square">
                <TouchableOpacity key={index} onPress={() => { !checked && CheckExercise(response.word)}}
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
=======
      <Block style={styles.courses}>
          <Title>{props.prompt}</Title>
          <View style={styles.container}>
            {props.options.map((word, index) => (
                <TouchableOpacity key={index} onPress={() => {CheckExercise(word)}}>
                    <Image
                      source={{ uri: signsImages[index] }}
                      style={styles.image}
                    />
                </TouchableOpacity>
            ))}
          </View>
          <CustomButton disabled={!responded} title={"VALIDER"} onPress={() => onNext}/>
      </Block>
>>>>>>> 89fc775 (feat: add new components and assets for lesson exercises)
    );
}

export default WordToImage;
<<<<<<< HEAD
=======

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
