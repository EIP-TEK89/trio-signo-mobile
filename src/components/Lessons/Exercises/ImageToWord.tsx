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
