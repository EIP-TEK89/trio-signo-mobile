import { ButtonProps as NativeButtonProps, StyleProp, Text, TouchableOpacity, ViewStyle } from "react-native";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends NativeButtonProps {
  title: string;
  className?: string;
  color?: string;
  textColor?: string;
  style?: StyleProp<ViewStyle>;
};

const Button: React.FC<ButtonProps> = ({ color = "duoGreen", textColor = "white", ...props }) => {

  return (
    <TouchableOpacity
          className={twMerge(`p-4 rounded-2xl ${ props.disabled ? 'bg-gray-400 opacity-50' : `bg-${color}`}`, props.className)}
          disabled={props.disabled} onPress={props.onPress}>
          <Text className={`text-2l font-black text-center ${`text-${textColor}`}`} style={{color: textColor}}>
            {props.title}
          </Text>
    </TouchableOpacity>
  );
}

export default Button;