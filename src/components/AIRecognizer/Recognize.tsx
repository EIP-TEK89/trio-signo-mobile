import { useEffect, useRef } from "react";
import Block from "../Block"
import { SignRecognizer } from "triosigno-lib";
import { OnnxRunnerMobile } from "triosigno-mobile"
import { Camera, CameraView, useCameraPermissions} from 'expo-camera'
import { Button, Text, View } from "react-native";



const Recognize: React.FC = () => {
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView>(null);
    
    useEffect(() => {
        
    }, []);

    console.log("permission", permission);
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