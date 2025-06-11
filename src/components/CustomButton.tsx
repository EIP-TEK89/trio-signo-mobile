import { Button, ButtonProps, StyleProp, StyleSheet, Text, Touchable, TouchableOpacity, View, ViewStyle } from "react-native";
import AppView from "./Ui/AppView";

interface CustomButtonProps extends ButtonProps {
    style?: StyleProp<ViewStyle>;
};

const CustomButton: React.FC<CustomButtonProps> = ({ ...props }) => {

  return (
    <AppView style={styles.inputContainer}>
        <TouchableOpacity
            {...props}
            style={StyleSheet.flatten([styles.button, props.style])}>
            <Text style={styles.title}>
                {props.title}
            </Text>
        </TouchableOpacity>
    </AppView>
  );
}

export default CustomButton;

const styles = StyleSheet.create({
    inputContainer: {
      width: '80%',
      alignItems: 'center',
      marginBottom: 16,
    },
    button: {
      width: '100%',
      backgroundColor: '#45B6FE',
      borderRadius: 12,
      padding: 14,
      alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontWeight: 'bold',
    }
  });