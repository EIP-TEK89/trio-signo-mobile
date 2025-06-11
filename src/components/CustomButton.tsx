import { Button, ButtonProps, StyleProp, StyleSheet, Text, Touchable, TouchableOpacity, View, ViewStyle } from "react-native";
<<<<<<< HEAD
import AppView from "./Ui/AppView";
=======
import Block from "./Block";
>>>>>>> 89fc775 (feat: add new components and assets for lesson exercises)

interface CustomButtonProps extends ButtonProps {
    style?: StyleProp<ViewStyle>;
};

const CustomButton: React.FC<CustomButtonProps> = ({ ...props }) => {

  return (
<<<<<<< HEAD
    <AppView style={styles.inputContainer}>
=======
    <Block style={styles.inputContainer}>
>>>>>>> 89fc775 (feat: add new components and assets for lesson exercises)
        <TouchableOpacity
            {...props}
            style={StyleSheet.flatten([styles.button, props.style])}>
            <Text style={styles.title}>
                {props.title}
            </Text>
        </TouchableOpacity>
<<<<<<< HEAD
    </AppView>
=======
    </Block>
>>>>>>> 89fc775 (feat: add new components and assets for lesson exercises)
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