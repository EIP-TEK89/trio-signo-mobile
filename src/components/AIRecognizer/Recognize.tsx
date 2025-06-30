import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import { SignRecognizer } from "triosignolib/core";
import { OnnxRunnerMobile, MediapipeRunnerMobile } from "triosignolib/mobile"
import { Camera, Frame, useFrameProcessor, useCameraDevice } from "react-native-vision-camera"

const Recognize: React.FC = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const device = useCameraDevice('back')
  let pickedDevice: number = 3; // front cam for my phone but maybe different for others
  const onnx_runner: OnnxRunnerMobile = new OnnxRunnerMobile("models/alphabet.zip");
  const mediapipe_runner: MediapipeRunnerMobile = new MediapipeRunnerMobile(
    "$assets/models/hand_detector.tflite",
    "$assets/models/hand_landmarker.tflite"
  )

  const sign_recon: SignRecognizer<Frame> = new SignRecognizer<Frame>(onnx_runner, mediapipe_runner)

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      console.log(status)
      const isGranted = status === 'granted';
      setHasPermission(isGranted);
      // if (isGranted) {
      //   // console.log(devices);

      //   for (let i = 0; i < devices.length; i++) {
      //     console.log(`Device ${i}:`, devices[i]["name"], devices[i]["position"]);
      //     console.log("Device capabilities:", devices[i]);
      //     console.log("==========================")
      //     if (devices[i]["position"] == "front") {
      //       pickedDevice = i;
      //       break;
      //     }
      //   }
      // }
      // console.log("Picked device:", pickedDevice);
    })();
  }, []);

  const logFrameSize = (width: number, height: number) => {
    // console.log(`Frame: ${width}x${height}`);
  };

  const logFrameSizeJS = Worklets.createRunOnJS(logFrameSize);

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    logFrameSizeJS(frame.width, frame.height);
  }, []);

  if (pickedDevice == null) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>Loading camera devices...</Text>
      </SafeAreaView>
    );
  }

  if (!hasPermission) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>No camera permission</Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        frameProcessor={frameProcessor}
      />
    </View>
  );
}

export default Recognize

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
