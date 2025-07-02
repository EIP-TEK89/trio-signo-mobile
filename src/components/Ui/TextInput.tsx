import {
  TextInput as NativeTextInput,
  TextInputProps as NativeTextInputProps,
  TouchableOpacity, 
  View} from "react-native";
import AppView from "./AppView";

import { twMerge } from "tailwind-merge";
import { Eye, EyeClosed } from "lucide-react-native";
import { useState } from "react";

interface TextInputProps extends NativeTextInputProps {
  type?: "default" | "password";
  className?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  type = "default",
  className,
  ...props
}) => {
  const [hidePassword, setHidePassword] = useState(props.secureTextEntry || false);

  return (
    <AppView className={twMerge("bg-white/10 rounded-xl justify-center", className, )}>
      <NativeTextInput
        {...props}
        secureTextEntry={hidePassword}
        placeholderTextColor="#8A9299"
        className={"w-full h-full px-4 py-3 text-[#CFD8DC] border border-transparent text-xl"}
      />
      {type === "password" && (
        <TouchableOpacity onPress={() => setHidePassword(!hidePassword)} className="absolute right-4 top-1/2 -translate-y-2">
          <View>
            {!hidePassword ? <Eye color={"white"} /> : <EyeClosed color={"white"} />}
          </View>
        </TouchableOpacity>
      )}
    </AppView>
  );
};

export default TextInput;
