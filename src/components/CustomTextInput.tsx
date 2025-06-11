import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
} from "react-native";
import AppView from "./Ui/AppView";
import { View } from "react-native";
import { twMerge } from "tailwind-merge";
import { useState } from "react";

interface CustomTextInputProps extends TextInputProps {
  type?: "default" | "password";
  className?: string;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  type = "default",
  className,
  ...props
}) => {
  return (
    <AppView className="w-4/5 items-center mb-4">
      <TextInput
        {...props}
        placeholderTextColor="#8A9299"
        className={twMerge(
          "w-full h-12 bg-white/10 rounded-xl px-4 py-3 text-[#CFD8DC] border border-transparent text-base",
          className
        )}
      />
      {type === "password" && (
        <TouchableOpacity className="absolute right-4 top-1/2 -translate-y-2">
          <Text className="text-[#45B6FE] text-xs font-medium">OUBLIÉ ?</Text>
        </TouchableOpacity>
      )}
    </AppView>
  );
};

export default CustomTextInput;
