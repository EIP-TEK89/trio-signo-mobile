
import React, { useEffect } from "react";
import AppView from "../Ui/AppView";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { twMerge } from "tailwind-merge";


interface ProgressBarProps {
  index: number;
  maxLength: number;
  className?: string;
  color?: "duoBlue" | "duoGreen" | "duoRed" | "duoYellow";
}

const ProgressBar: React.FC<ProgressBarProps> = ({ index, maxLength, className, color="duoBlue" }) => {

  const progress = useSharedValue(index > 0 ? (((index - 1) / maxLength) * 100) : 0);
  const progressPercentage = (index / maxLength) * 100;

  useEffect(() => {
    progress.value = withTiming(progressPercentage, {
      duration: 600,
      easing: Easing.inOut(Easing.ease),
    });
  }, [progressPercentage, progress]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value}%`,
    };
  });

  return (
    <AppView className={twMerge("flex-1 flex-row h-6", className)}>
      <AppView className="flex-1 bg-gray-300 rounded-full">
        <Animated.View
          className={`flex-1 ${"bg-" + color} rounded-full`}
          style={animatedStyle}
        />
      </AppView>
    </AppView>
  );
};

export default ProgressBar;
