import { useTheme } from "@context/ThemeContext";
import { StyleProp, useColorScheme, View, ViewStyle } from "react-native";

interface BlockProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  className?: string;
}

const Block: React.FC<BlockProps> = ({ ...props }) => {
  const theme = useTheme();
  const systemTheme = useColorScheme();

  return (
    <View
      style={[
        {
          backgroundColor:
            systemTheme == "dark"
              ? theme.colors.foreground
              : theme.colors.background,
        },
        props.style,
      ]}
      className={props.className}
    >
      {props.children}
    </View>
  );
};

export default Block;
