import React from "react";
import { TouchableOpacity, View } from "react-native";
import AppView from "../Ui/AppView";
import { router } from "expo-router";
import CrossIcon from '@assets/Courses/cross.svg'

interface ProgressBarProps {
  index: number;
  maxLength: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ index, maxLength }) => {
  const progressPercentage = Math.round((index / maxLength) * 100);

  return (
    <AppView className="flex-row w-full h-[5%] items-center m-[4%] mb-[2%] gap-[4%]">
          <TouchableOpacity onPress={() => router.back()}>
            <CrossIcon width={25} height={25}/>
          </TouchableOpacity>
          <AppView className="w-[79%] bg-gray-300 rounded-full">
            <AppView className={`bg-duoBlue h-[45%] rounded-full`} style={{ width: `${progressPercentage}%` }}>
            </AppView>
          </AppView>
        </AppView>
  );
};

export default ProgressBar;