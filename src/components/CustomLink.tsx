import { Href, Link, Redirect } from "expo-router";
import { Button, ButtonProps, StyleProp, StyleSheet, Text, Touchable, TouchableOpacity, View, ViewStyle } from "react-native";
<<<<<<< HEAD
import AppView from "./Ui/AppView";
=======
import Block from "./Block";
>>>>>>> 89fc775 (feat: add new components and assets for lesson exercises)

interface CustomLinkProps {
    title: string;
    href: Href;
    style?: StyleProp<ViewStyle>;
};

const CustomLink: React.FC<CustomLinkProps> = ({ ...props }) => {
  return (
<<<<<<< HEAD
    <AppView style={styles.inputContainer}>
    <AppView style={StyleSheet.flatten([styles.button, props.style])}>
=======
    <Block style={styles.inputContainer}>
    <Block style={StyleSheet.flatten([styles.button, props.style])}>
>>>>>>> 89fc775 (feat: add new components and assets for lesson exercises)
        <Link href={props.href}>
            <Text style={styles.title}>
                {props.title}
            </Text>
        </Link>
<<<<<<< HEAD
    </AppView>
    </AppView>
=======
    </Block>
    </Block>
>>>>>>> 89fc775 (feat: add new components and assets for lesson exercises)
  );
}

export default CustomLink;

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
        backgroundColor: '#4b4b4b',
        borderColor: "rgba(158, 150, 150, 0.5)",
        shadowColor: '',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.58,
        borderWidth: 3,
        borderRadius: 20,
        marginBottom: 20,
        fontSize: 16,
    },
    title: {
        color: '',
        fontWeight: 'bold',
    }
  });