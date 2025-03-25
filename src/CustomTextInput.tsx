import { StyleSheet, Text, TextInput, TextInputProps, Touchable, TouchableOpacity, View } from "react-native";

interface CustomTextInputProps extends TextInputProps {
  type?: 'default' | 'password';
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({ type = 'default', ...props}) => {

  return (
    <View style={styles.inputContainer}>
      <TextInput
          {...props}
          placeholderTextColor="#8A9299"
          style={StyleSheet.flatten([styles.input, props.style])}
    />
    {type === 'default' ||
    <TouchableOpacity style={styles.forgotButton}>
        <Text style={styles.forgotText}>OUBLIÉ ?</Text>
    </TouchableOpacity>}
    </View>
  );
}

export default CustomTextInput;

const styles = StyleSheet.create({
    inputContainer: {
      width: '80%',
      alignItems: 'center',
      marginBottom: 16,
    },
    input: {
      width: '100%',
      height: 50,
      backgroundColor: 'rgba(255, 255, 255, 0.07)',
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 14,
      color: '#CFD8DC',
      borderWidth: 1,
      borderColor: 'transparent',
      fontSize: 16,
    },
    forgotButton: {
      position: 'absolute',
      right: 16,
      top: '50%',
      transform: [{ translateY: -10 }],
    },
    forgotText: {
      color: '#45B6FE',
      fontSize: 12,
      fontWeight: '500',
    },
  });