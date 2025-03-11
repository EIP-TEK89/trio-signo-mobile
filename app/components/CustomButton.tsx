import { Button, ButtonProps, StyleProp, StyleSheet, Text, Touchable, TouchableOpacity, View, ViewStyle } from "react-native";

interface CustomButtonProps extends ButtonProps {
    style?: StyleProp<ViewStyle>;
};

const CustomButton: React.FC<CustomButtonProps> = ({ ...props }) => {

  return (
    <View style={styles.inputContainer}>
        <TouchableOpacity
            {...props}
            style={StyleSheet.flatten([styles.button, props.style])}>
            <Text style={styles.title}>
                {props.title}
            </Text>
        </TouchableOpacity>
    </View>
  );
}

export default CustomButton;

const styles = StyleSheet.create({
    inputContainer: {
      width: '80%',
      alignItems: 'center',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        height: 50,
        backgroundColor: '#610b63',
        borderColor: '#610b63',
        shadowColor: '#610b63',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.58,
        borderWidth: 1,
        borderRadius: 20,
        marginTop: 10,
        marginBottom: 20,
        fontSize: 16,
    },
    title: {
        color: '#fff',
        fontWeight: 'bold',
    }
  });