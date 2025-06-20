import { Text, TextProps } from "react-native";


const AppText: React.FC<TextProps> = ({ ...props }) => {
  const defaultStyle = "text-text"
  
  return (
    <Text
      style={[
        props.style,
      ]}
      className={`${defaultStyle} ${props.className}`}
    >
      {props.children}
    </Text>
  );
};

export default AppText;
