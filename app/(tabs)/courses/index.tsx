import { useCallback, useRef, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import coursesData from '../../assets/courses/Courses.json';
import Webcam from 'react-webcam';
import axios from 'axios';
import ProgressBar from '../../components/ProgressBar';
import { Link } from 'expo-router';

export default function CoursesScreen() {
  const webcamRef = useRef<Webcam>(null);

  const [step, setStep] = useState(1);

  const [currentExoIndex, setCurrentExoIndex] = useState(0);
  const currentExo = coursesData.exercices[currentExoIndex];

  const handleNextExo = () => {
      if (currentExoIndex < coursesData.exercices.length - 1) {
          setCurrentExoIndex(currentExoIndex + 1);
          setStep(step + 1)
      }
      //display publicity on phone
  };

  const BadAnswer = async () => {
      //call life -1
      handleNextExo()
  };

  /*
  * Multiple Images answer
  * Status: OK
  * 
  */
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const [buttonAnswer, setButtonAnswer] = useState<string | null>(null);

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


  /*
  * Write the answer
  * Status: OK
  * 
  */
  const [text, setText] = useState<string | undefined>(undefined);
  const handleSubmit = (message: string) => {
      if (text !== undefined) {
          if (message === text)
              handleNextExo()
          else
              BadAnswer()
      }
      setText(undefined)
  };

  /*
  * Multiple Signification answer
  * Status: OK
  * 
  */
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



  /*
  * Camera
  * Status: OK
  * 
  */
  const capture = useCallback(async (answer: string) => {
      if (webcamRef.current !== null) {
          const imageSrc = webcamRef.current.getScreenshot();

          // Envoyer l'image au serveur
          if (imageSrc) {
              const blob = await fetch(imageSrc).then(res => res.blob());
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
  }, [webcamRef]);

  return (
    <View style={styles.container}>

            <View className='coursesJourney'>
                <View className="View">
                    <Link href={"/(tabs)"} className="cross-button">
                        <Image source={require(`@assets/icons/cross-button.png`)} style={styles.icon} alt="cross-Image" className="icon" />
                    </Link>
                    <ProgressBar currentStep={step} />
                    <View className="icon-container">
                        <Image source={require(`@assets/icons/life.png`)} alt="Life" style={styles.icon} className="icon" />
                        <Text className="text">5</Text>
                        {/* {heartCount} */}
                    </View>
                </View>

                <View className='bodyCourses'>
                    {currentExo.type_exo === "tuto" && (
                        <View className='tuto'>
                            <Text>{currentExo.question}</Text>
                            <Image
                                source={require(`@assets/hands/a.jpg`)}
                                style={styles.image}
                                alt={'image'}
                                onError={(e) => {
                                    console.log("error: " + e);

                                }}
                            />
                            <TouchableOpacity className="pushable" onPress={handleNextExo}>
                                <Text className="front">
                                    Validé
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    {currentExo.type_exo === "choix_multiple_image" && (
                        <View className='tuto'>
                            <Text>{currentExo.question}</Text>
                            <View className='image-selection'>
                                {currentExo.reponse.map((reponse, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        className={`Image-Button ${activeButton === index ? 'active' : ''}`}
                                        onPress={() => handleButtonClick(index, typeof reponse === 'object' && 'name' in reponse ? reponse.name : null)}
                                    >
                                        <Image
                                            src={typeof reponse === 'object' && 'name' in reponse ?
                                                `../assets/hands/${reponse.name}.jpg`
                                                : ''}
                                            alt="image"
                                            className='choice-Image'
                                        />
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <TouchableOpacity className="pushable" onPress={() => handleMultipleImages(currentExo.reponse_attendue)}>
                                <Text className="front">
                                    Validé
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    {currentExo.type_exo === "ecrire_signe" && (
                        <View className='tuto'>
                            <Text>{currentExo.question}</Text>
                            <Image
                                src={`../assets/hands/${currentExo.reponse_attendue}.jpg`}
                                alt="image"
                                className='write-Image'
                            />
                            <form className='form-answer' onSubmit={(e) => { e.preventDefault(); handleSubmit(currentExo.reponse_attendue); }}>
                                <input
                                    type="text"
                                    className='form-answer-input'
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                />
                                <TouchableOpacity className="pushable">
                                    <Text className="front">
                                        Validé
                                    </Text>
                                </TouchableOpacity>
                            </form>
                        </View>
                    )}
                    {currentExo.type_exo === "choix_multiple_signification" && (
                        <View className='tuto'>
                            <Text>{currentExo.question}</Text>
                            <Image
                                src={`../assets/hands/${currentExo.reponse_attendue}.jpg`}
                                alt="image"
                                className='multiple-choice-Image'
                            />
                            <View className='text-selection'>
                                {currentExo.reponse.map((reponse, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        className={`text-Button ${activeButton === index ? 'active' : ''}`}
                                        onPress={() => handleButtonClick(index, typeof reponse === 'object' && 'name' in reponse ? reponse.name : null)}
                                    >
                                        {typeof reponse === 'object' && 'name' in reponse ? reponse.name : ''}
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <TouchableOpacity className="pushable" onPress={() => handleMultipleSignification(currentExo.reponse_attendue)}>
                                <Text className="front">
                                    Validé
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    {currentExo.type_exo === "camera" && (
                        <View className='tuto'>
                            <Text>{currentExo.question}</Text>
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/png"
                                width={540}
                                height={480}
                            />
                            <TouchableOpacity className="pushable" onPress={() => capture(currentExo.reponse_attendue)}>
                                <Text className="front">
                                    Validé
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View >
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
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
});
