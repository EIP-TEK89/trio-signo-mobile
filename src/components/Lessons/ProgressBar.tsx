import React from "react";
import { View } from "react-native";

interface ProgressBarProps {
  currentStep: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  const progressPercentage = (currentStep / 20) * 100;

  return (
    <View className="progress-bar-container">
      <View
        className="progress-bar-fill"
        style={{ width: `${progressPercentage}%` }}
      ></View>
    </View>
  );
};

export default ProgressBar;