import Block from "@/components/Block";
import CustomButton from "@/components/CustomButton";
import Title from "@/components/Title";
import { getSignImageRequest } from "@/services/dictionnary";
import { CheckExerciseRequest } from "@/services/lessons";
import { ExerciseWithSign } from "@/types/LessonInterface";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface WordToImageProps {
    onNext: () => void;
    exercise: ExerciseWithSign
}

const WordToImage: React.FC<WordToImageProps> = ({ onNext, exercise }) => {
    const [loading, setLoading] = useState(true);
    const [signsImages, setSignsImages] = useState<string[]>([]);
    const [responded, setResponded] = useState(false);

    useEffect(() => {
        const loadSign = async () => {
            const images = await Promise.all(
                exercise.options.map(async (word) => {
                    return getSignImageRequest(word);
                })
            );
            setSignsImages(images);
            setLoading(false);
        };
        loadSign();
    }, []);

    const CheckExercise = async (word: string) => {
            setLoading(true);
            const result = await CheckExerciseRequest(exercise.id, word, true)
            if (result === null)
              router.back()
            if (result.isCorrect)
                setResponded(true);
            setLoading(false);
        }
    
    if (loading) {
        return (
          <Block style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#fff' }}>Loading...</Text>
          </Block>
        );
      }

    return (
      <Block style={styles.courses}>
          <Title>{exercise.prompt}</Title>
          <View style={styles.container}>
            {exercise.options.map((word, index) => (
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
    );
}

export default WordToImage;

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
