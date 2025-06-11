import { StyleSheet, TextInput, TextInputProps, View } from "react-native";


const CustomTextInput: React.FC<TextInputProps> = ({ ...props }) => {

  return (
    <View style={styles.inputContainer}>
      <TextInput
          {...props}
          placeholderTextColor={'#fff'}
          style={StyleSheet.flatten([styles.input, props.style])}
    />
    </View>
  );
}

export default CustomTextInput;

const styles = StyleSheet.create({
    inputContainer: {
      width: '80%',
      alignItems: 'center',
    },
    input: {
      width: '80%',
      height: 50,
      backgroundColor: '#4b4b4b',
      color: '#fff',
      borderColor: '#ccc',
      borderWidth: 1,
      fontWeight: 'bold',
      borderRadius: 20,
      marginBottom: 20,
      paddingLeft: 10,
      fontSize: 16,
    },
  });