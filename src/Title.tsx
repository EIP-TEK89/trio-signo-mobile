import { Href, Link, Redirect } from "expo-router";
import { Button, ButtonProps, StyleProp, StyleSheet, Text, TextProps, Touchable, TouchableOpacity, View, ViewStyle } from "react-native";

const Title: React.FC<TextProps> = ({ ...props }) => {

  return (
    <Text
        {...props} 
        style={StyleSheet.flatten([styles.title, props.style])}
    />
);
}

export default Title;

const styles = StyleSheet.create({
    title: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24,
    }
  });