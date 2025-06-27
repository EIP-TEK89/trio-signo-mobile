import { useEffect, useRef } from "react";
import { CameraView, useCameraPermissions} from 'expo-camera'
import { Button, Text, View } from "react-native";
import { SignRecognizer, _OnnxRunner, _MediapipeRunner, DataGestures } from "triosignolib/core";
import { OnnxRunnerMobile, MediapipeRunnerMobile } from "triosignolib/mobile"
import { Frame } from "react-native-vision-camera"

const Recognize: React.FC = () => {
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView>(null);
    const onnx_runner: OnnxRunnerMobile = new OnnxRunnerMobile();
    // const mediapipe_runner: MediapipeRunnerMobile = new MediapipeRunnerMobile()
    // const sign_recon: SignRecognizer<Frame> = new SignRecognizer<Frame>(onnx_runner, mediapipe_runner)
    // const sign_recon: SignRecognizer<number> = new SignRecognizer<number>(new _OnnxRunner(""), new _MediapipeRunner())
    
    useEffect(() => {
        
    }, []);

    if (!permission?.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission"/>
      </View>
    );
  }

    return (
        <View className="flex-1 bg-white">
            <CameraView
                style={{ flex: 1 }}
                facing={'front'}
                ref={cameraRef}
                >
                </CameraView>
        </View>
    )
}

export default Recognize;