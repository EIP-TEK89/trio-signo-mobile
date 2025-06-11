
import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import AppView from "../Ui/AppView";
import { router } from "expo-router";
import CrossIcon from '@assets/Courses/cross.svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";


interface ProgressBarProps {
  index: number;
  maxLength: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ index, maxLength }) => {

  const progress = useSharedValue(index > 0 ? (((index - 1) / maxLength) * 100) : 0);
  const progressPercentage = (index / maxLength) * 100;

  useEffect(() => {
    progress.value = withTiming(progressPercentage, {
      duration: 600,
      easing: Easing.inOut(Easing.ease),
    });
  }, [progressPercentage]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value}%`,
    };
  });

  return (
    <AppView className="flex-row w-full h-[5%] items-center m-[4%] mb-[2%] gap-[4%]">
      <TouchableOpacity onPress={() => router.back()}>
        <CrossIcon width={25} height={25} />
      </TouchableOpacity>
      <AppView className="w-[79%] bg-gray-300 rounded-full">
        <Animated.View
          className="bg-duoBlue h-[45%] rounded-full"
          style={animatedStyle}
        />
      </AppView>
    </AppView>
  );
};

export default ProgressBar;
