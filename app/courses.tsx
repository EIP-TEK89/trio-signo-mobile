import { useCallback, useRef, useState } from 'react';
import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import coursesData from 'assets/courses/Courses.json';
import { Camera, CameraView, useCameraPermissions } from 'expo-camera';
import axios from 'axios';
import ProgressBar from '@/components/ProgressBar';
import { Link } from 'expo-router';
import CustomTouchableOpacity from '@/components/CustomTouchableOpacity';
import CustomButton from '@/components/CustomButton';
import CustomTextInput from '@/components/CustomTextInput';
import Title from '@/components/Title';

export default function CoursesScreen() {

  const [step, setStep] = useState(1);

  const [currentExoIndex, setCurrentExoIndex] = useState(0);
  const currentExo = coursesData.exercices[currentExoIndex];
  
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const [buttonAnswer, setButtonAnswer] = useState<string | null>(null);

  const [text, setText] = useState<string | undefined>(undefined);

  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  const capture = useCallback(async (answer: string) => {
    if (cameraRef.current !== null) {
        const imageSrc = await cameraRef.current.takePictureAsync();

        // Envoyer l'image au serveur
        if (imageSrc) {
            const blob = await fetch(imageSrc.uri).then(res => res.blob());
            const formData = new FormData();
            formData.append('file', blob, 'image.jpg');

            try {
                const response = await axios.post('http://localhost:5000/get-alphabet', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log(response.data.message);
                console.log(answer)
                if (response.data.message == answer.toUpperCase())
                    handleNextExo()
                else
                    BadAnswer()
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
        }
    }, [cameraRef]);

  const handleNextExo = () => {
      if (currentExoIndex < coursesData.exercices.length - 1) {
          setCurrentExoIndex(currentExoIndex + 1);
          setStep(step + 1)
      }
  };

  const BadAnswer = async () => {
      handleNextExo()
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>We need your permission to show the camera</Text>
        <CustomButton onPress={requestPermission} title="grant permission" />
      </View>
    );
  }
  const handleButtonClick = (index: number | null, answer: string | null) => {
      setActiveButton(activeButton === index ? null : index);
      setButtonAnswer(answer)
  };

  const handleMultipleImages = (message: string) => {
      if (buttonAnswer !== null) {
          if (message === buttonAnswer)
              handleNextExo()
          else
              BadAnswer()
      }
      setActiveButton(null)
      setButtonAnswer(null)
  };

  const handleSubmit = (message: string) => {
      if (text !== undefined) {
          if (message === text)
              handleNextExo()
          else
              BadAnswer()
      }
      setText(undefined)
  };


  const handleMultipleSignification = (message: string) => {
      if (buttonAnswer !== null) {
          console.log(message)
          console.log(buttonAnswer)
          if (message === buttonAnswer)
              handleNextExo()
          else
              BadAnswer()
      }
      setActiveButton(null)
      setButtonAnswer(null)
  };
  
  return (
    <View style={styles.container}>

            <View style={styles.body}>
                <View style={styles.header}>
                    <Link href={"/(app)/(coursesJourney)"} className="cross-button">
                        <Image source={require(`@assets/icons/cross-button.png`)} style={styles.icon} alt="cross-Image" className="icon" />
                    </Link>
                    <ProgressBar currentStep={step} />
                    <View className="icon-container">
                        <Image source={require(`@assets/icons/life.png`)} alt="Life" style={styles.icon} className="icon" />
                        <Text className="text">5</Text>
                        {/* {heartCount} */}
                    </View>
                </View>

                <View style={styles.courses}>
                    {currentExo.type_exo === "tuto" && (
                        <View style={styles.courses}>
                            <Title>{currentExo.question}</Title>
                            <Image
                                source={require(`@assets/hands/a.jpg`)}
                                style={styles.image}
                                alt={'image'}
                                onError={(e) => {
                                    console.log("error: " + e);

                                }}
                            />
                            <CustomButton title="Valider" onPress={handleNextExo} />
                        </View>
                    )}
                    {currentExo.type_exo === "choix_multiple_image" && (
                        <View style={styles.courses}>
                            <Title>{currentExo.question}</Title>
                            <View style={styles.choicesList}>
                            <TouchableOpacity
                                onPress={() => handleButtonClick(0, "A")}
                            >
                                <Image
                                    source={require(`@assets/hands/a.jpg`)}
                                    style={styles.image}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleButtonClick(1, "B")}
                            >
                                <Image
                                    source={require(`@assets/hands/b.jpg`)}
                                    style={styles.image}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleButtonClick(1, "C")}
                            >
                                <Image
                                    source={require(`@assets/hands/c.jpg`)}
                                    style={styles.image}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleButtonClick(1, "D")}
                            >
                                <Image
                                    source={require(`@assets/hands/d.jpg`)}
                                    style={styles.image}
                                />
                            </TouchableOpacity>
                            </View>

                            <CustomButton title="Valider" onPress={() => handleMultipleImages(currentExo.reponse_attendue)} />
                        </View>
                    )}
                    {currentExo.type_exo === "ecrire_signe" && (
                        <View style={styles.courses}>
                            <Title>{currentExo.question}</Title>
                            <Image
                                source={require(`@assets/hands/a.jpg`)}
                                alt="image"
                                style={styles.image}
                            />
                                <CustomTextInput
                                    keyboardType="default"
                                    className='form-answer-input'
                                    value={text}
                                    onChangeText={(e) => setText(e)}
                                />
                                <CustomButton title="Valider" onPress={() => handleSubmit(currentExo.reponse_attendue)} />
                        </View>
                    )}
                    {currentExo.type_exo === "choix_multiple_signification" && (
                        <View style={styles.courses}>
                            <Title>{currentExo.question}</Title>
                            <Image
                                source={require(`@assets/hands/a.jpg`)}
                                alt="image"
                                style={styles.image}
                            />
                            <View style={styles.choicesList}>
                                {currentExo.reponse.map((reponse, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        className={`text-Button ${activeButton === index ? 'active' : ''}`}
                                        onPress={() => handleButtonClick(index, typeof reponse === 'object' && 'name' in reponse ? reponse.name : null)}
                                    >
                                        <Title>
                                            {typeof reponse === 'object' && 'name' in reponse ? reponse.name : ''}
                                        </Title>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <CustomButton title="Valider" onPress={() => handleMultipleSignification(currentExo.reponse_attendue)} />
                        </View>
                    )}
                    {currentExo.type_exo === "camera" && (
                        <View style={styles.courses}>
                            <Title>{currentExo.question}</Title>
                            <CameraView ref={cameraRef} facing='front' style={styles.Camera}>
                            </CameraView>
                            <CustomButton title="Valider" onPress={() => capture(currentExo.reponse_attendue)} />
                        </View>
                    )}
                </View>
            </View >
    </View>
  );
}

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
