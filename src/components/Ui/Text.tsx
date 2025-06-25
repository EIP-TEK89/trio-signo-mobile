import { cssInterop } from "nativewind";
import { Text as NativeText, TextProps } from "react-native";
import { twMerge } from "tailwind-merge";


const Text: React.FC<TextProps> = ({ ...props }) => {
  const defaultStyle = "text-text"
  cssInterop(NativeText, {className: "style"});
  return (
    <NativeText
      style={[
        props.style,
      ]}
      className={twMerge(defaultStyle, props.className)}
    >
      {props.children}
    </NativeText>
  );
};

export default Text;
