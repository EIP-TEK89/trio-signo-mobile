import { useEffect, useRef } from "react";
import Block from "../Block"
import { SignRecognizer } from "triosigno-lib";
import { OnnxRunnerMobile } from "triosigno-mobile"
import { Camera, CameraView, useCameraPermissions} from 'expo-camera'
import { Button, Text, View } from "react-native";


<<<<<<< HEAD
const Recognize: React.FC = () => {
    const signRecognizer = new SignRecognizer(new OnnxRunnerMobile(), "url/or/path/to/the/model");
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView>(null);
    const loading = useRef(false);
    
    useEffect(() => {
        cameraRef.current?.takePictureAsync()
    }, []);

    const captureImage = async () => {
      const picture = await cameraRef.current?.takePictureAsync()

    }

=======

const Recognize: React.FC = () => {
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView>(null);
    
    useEffect(() => {
        
    }, []);

    console.log("permission", permission);
>>>>>>> 10dd296 (Feat(Recognize): Implement camera permission handling and UI for AI recognition)
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