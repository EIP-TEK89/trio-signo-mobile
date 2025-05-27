import { Button, ButtonProps, Image, StyleProp, StyleSheet, Text, Touchable, TouchableOpacity, View, ViewStyle } from "react-native";
import AppView from "./Ui/AppView";
import Star from "@assets/CoursesJourney/Home/star.svg";

interface CourseButtonProps extends ButtonProps {
    style?: StyleProp<ViewStyle>;
};

const CourseButton: React.FC<CourseButtonProps> = ({ ...props }) => {

  return (
    <AppView style={styles.inputContainer}>
         
        <TouchableOpacity
            {...props}
            style={StyleSheet.flatten([styles.button, props.style])}>
             <Star
              width={50} height={50} backgroundColor={"#333"}/>
        </TouchableOpacity>
    </AppView>
  );
}

export default CourseButton;

const styles = StyleSheet.create({
    inputContainer: {
      width: '80%',
      alignItems: 'center',
      marginBottom: 16,
    },
    button: {
      width: 100,
      height: 100,
      backgroundColor: '#45B6FE',
      borderRadius: '50%',
      padding: 14,
      alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontWeight: 'bold',
    }
  });