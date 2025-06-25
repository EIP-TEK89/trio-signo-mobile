import {
  Text,
  TextInput as NativeTextInput,
  TextInputProps as NativeTextInputProps,
  TouchableOpacity } from "react-native";
import AppView from "./AppView";

import { twMerge } from "tailwind-merge";

interface TextInputProps extends NativeTextInputProps {
  type?: "default" | "password";
  className?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  type = "default",
  className,
  ...props
}) => {
  return (
    <AppView className={twMerge("bg-white/10 rounded-xl justify-center", className, )}>
      <NativeTextInput
        {...props}
        placeholderTextColor="#8A9299"
        className={"w-full h-full px-4 py-3 text-[#CFD8DC] border border-transparent text-xl"}
      />
      {type === "password" && (
        <TouchableOpacity className="absolute right-4 top-1/2 -translate-y-2">
          <Text className="text-[#45B6FE] text-xs font-medium">OUBLIÉ ?</Text>
        </TouchableOpacity>
      )}
    </AppView>
  );
};

export default TextInput;
