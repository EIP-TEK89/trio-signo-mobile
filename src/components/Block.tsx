import { useTheme } from "@context/ThemeContext";
import { Link } from "expo-router";
import { StyleProp, StyleSheet, Text, useColorScheme, View, ViewStyle } from "react-native";

interface BlockProps {
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>
};

const Block: React.FC<BlockProps> = ({ ...props }) => {
    const theme = useTheme();
    const systemTheme = useColorScheme();

  return (
    <View style={[{backgroundColor: systemTheme == 'dark' ? theme.colors.background : theme.colors.foreground}, props.style]}>
        {props.children}
    </View>
  );
}

export default Block;

const styles = StyleSheet.create({
    inputContainer: {
      width: '80%',
      alignItems: 'center',
    },
    
    title: {
        color: '',
        fontWeight: 'bold',
    }
  });