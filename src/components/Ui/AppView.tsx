import { View, ViewProps } from "react-native";

const AppView: React.FC<ViewProps> = ({ ...props }) => {
  const defaultStyle = "bg-background"
  
  return (
    <View
      style={[
        props.style,
      ]}
      className={`${defaultStyle} ${props.className}`}
    >
      {props.children}
    </View>
  );
};

export default AppView;
