import { useCallback, useRef, useState } from "react";
import {
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  View,
} from "react-native";
import coursesData from "@assets/Courses.json";
import { CameraView, useCameraPermissions } from "expo-camera";
import axios from "axios";
import CustomButton from "@components/CustomButton";
import CustomTextInput from "@components/CustomTextInput";
import Title from "@components/Title";

// TODO: Move this to a separate file or a constants file
const handsImages: { [key: string]: any } = {
  A: require("@assets/hands/a.jpg"),
  B: require("@assets/hands/b.jpg"),
  C: require("@assets/hands/c.jpg"),
  D: require("@assets/hands/d.jpg"),
};

export default function CoursesScreen() {
  const [step, setStep] = useState(1);
  const [currentExoIndex, setCurrentExoIndex] = useState(0);
  const currentExo = coursesData.exercices[currentExoIndex];

  const [activeButton, setActiveButton] = useState<number | null>(null);
  const [buttonAnswer, setButtonAnswer] = useState<string | null>(null);
  const [text, setText] = useState<string | undefined>(undefined);

  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  const capture = useCallback(
    async (answer: string) => {
      if (cameraRef.current !== null) {
        const imageSrc = await cameraRef.current.takePictureAsync();
        if (imageSrc) {
          const blob = await fetch(imageSrc.uri).then((res) => res.blob());
          const formData = new FormData();
          formData.append("file", blob, "image.jpg");

          try {
            const response = await axios.post(
              "http://localhost:5000/get-alphabet",
              formData,
              {
                headers: { "Content-Type": "multipart/form-data" },
              }
            );

            if (response.data.message === answer.toUpperCase()) {
              handleNextExo();
            } else {
              BadAnswer();
            }
          } catch (error) {
            console.error("Error uploading image:", error);
          }
        }
      }
    },
    [cameraRef]
  );

  const handleNextExo = () => {
    if (currentExoIndex < coursesData.exercices.length - 1) {
      setCurrentExoIndex(currentExoIndex + 1);
      setStep(step + 1);
    }
  };

  const BadAnswer = () => {
    handleNextExo();
  };

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text className="text-white">
          Permission requise pour utiliser la caméra
        </Text>
        <CustomButton onPress={requestPermission} title="Autoriser" />
      </SafeAreaView>
    );
  }

  const handleButtonClick = (index: number | null, answer: string | null) => {
    setActiveButton(activeButton === index ? null : index);
    setButtonAnswer(answer);
  };

  const handleMultipleImages = (message: string) => {
    if (buttonAnswer !== null) {
      message === buttonAnswer ? handleNextExo() : BadAnswer();
    }
    setActiveButton(null);
    setButtonAnswer(null);
  };

  const handleSubmit = (message: string) => {
    if (text !== undefined) {
      message === text ? handleNextExo() : BadAnswer();
    }
    setText(undefined);
  };

  const handleMultipleSignification = (message: string) => {
    if (buttonAnswer !== null) {
      message === buttonAnswer ? handleNextExo() : BadAnswer();
    }
    setActiveButton(null);
    setButtonAnswer(null);
  };

  return (
    <SafeAreaView className="flex-1 bg-black px-4">
      <View className="w-full mt-12 space-y-10 items-center">
        {currentExo.type_exo === "tuto" && (
          <View className="items-center space-y-6">
            <Title>{currentExo.question}</Title>
            <Image
              source={require("@assets/hands/a.jpg")}
              className="w-40 h-40 rounded-full"
            />
            <CustomButton title="Valider" onPress={handleNextExo} />
          </View>
        )}

        {currentExo.type_exo === "choix_multiple_image" && (
          <View className="items-center space-y-6">
            <Title>{currentExo.question}</Title>
            <View className="flex-row flex-wrap justify-center gap-4">
              {["a", "b", "c", "d"].map((letter, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleButtonClick(index, letter.toUpperCase())}
                >
                  <Image
                    source={handsImages[letter.toUpperCase()]}
                    className="w-36 h-36 rounded-full"
                  />
                </TouchableOpacity>
              ))}
            </View>
            <CustomButton
              title="Valider"
              onPress={() => handleMultipleImages(currentExo.reponse_attendue)}
            />
          </View>
        )}

        {currentExo.type_exo === "ecrire_signe" && (
          <View className="items-center space-y-6">
            <Title>{currentExo.question}</Title>
            <Image
              source={require("@assets/hands/a.jpg")}
              className="w-40 h-40 rounded-full"
            />
            <CustomTextInput
              value={text}
              onChangeText={setText}
              keyboardType="default"
              className="w-full max-w-md h-12 px-4 rounded bg-white/10 text-white"
            />
            <CustomButton
              title="Valider"
              onPress={() => handleSubmit(currentExo.reponse_attendue)}
            />
          </View>
        )}

        {currentExo.type_exo === "choix_multiple_signification" && (
          <View className="items-center space-y-6">
            <Title>{currentExo.question}</Title>
            <Image
              source={require("@assets/hands/a.jpg")}
              className="w-40 h-40 rounded-full"
            />
            <View className="flex-row flex-wrap justify-center gap-4">
              {currentExo.reponse.map((reponse, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    handleButtonClick(index, reponse?.name ?? null)
                  }
                  className={`px-4 py-2 rounded bg-white/10 ${
                    activeButton === index ? "border border-white" : ""
                  }`}
                >
                  <Title>{reponse?.name}</Title>
                </TouchableOpacity>
              ))}
            </View>
            <CustomButton
              title="Valider"
              onPress={() =>
                handleMultipleSignification(currentExo.reponse_attendue)
              }
            />
          </View>
        )}

        {currentExo.type_exo === "camera" && (
          <View className="items-center space-y-6">
            <Title>{currentExo.question}</Title>
            <CameraView
              ref={cameraRef}
              facing="front"
              className="w-72 h-72 rounded-full border border-white"
            />
            <CustomButton
              title="Valider"
              onPress={() => capture(currentExo.reponse_attendue)}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
