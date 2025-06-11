import { StyleSheet, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
<<<<<<< HEAD
import AppView from "./Ui/AppView";
=======
import Block from "./Block";
>>>>>>> 89fc775 (feat: add new components and assets for lesson exercises)


const CustomTouchableOpacity: React.FC<TouchableOpacityProps> = ({ ...props }) => {

  return (
<<<<<<< HEAD
    <AppView style={styles.inputContainer}>
=======
    <Block style={styles.inputContainer}>
>>>>>>> 89fc775 (feat: add new components and assets for lesson exercises)
      <TouchableOpacity
          {...props}
          style={StyleSheet.flatten([styles.button, props.style])}

    />
<<<<<<< HEAD
    </AppView>
=======
    </Block>
>>>>>>> 89fc775 (feat: add new components and assets for lesson exercises)
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