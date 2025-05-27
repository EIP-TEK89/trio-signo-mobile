import { StyleSheet, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import AppView from "./Ui/AppView";


const CustomTouchableOpacity: React.FC<TouchableOpacityProps> = ({ ...props }) => {

  return (
    <AppView style={styles.inputContainer}>
      <TouchableOpacity
          {...props}
          style={StyleSheet.flatten([styles.button, props.style])}

    />
    </AppView>
  );
}

export default CustomTouchableOpacity;

const styles = StyleSheet.create({
    inputContainer: {
      width: '80%',
      alignItems: 'center',
    },
    button: {
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