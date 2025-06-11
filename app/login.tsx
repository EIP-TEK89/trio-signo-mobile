import { useAuth } from "context/AuthContext";
import { Link } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native"
import CustomTextInput from "./components/CustomTextInput";
import CustomButton from "./components/CustomButton";
import CustomLink from "./components/CustomLink";

export default function LoginScreen() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { onLogin, onRegister } = useAuth();

    const login = async () => {
        const result = await onLogin!( email, password );
        if (result && result.error) {
            alert(result.msg);
        }
    }

    const register = async () => {
        const result = await onRegister!( username, email, password );
        if (result && result.error) {
            alert(result.msg);
        } else {
            login();
        }
    }
    return (
        <View style={styles.container}>
            <CustomTextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
        
            <CustomTextInput
                placeholder="Mot de passe"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <CustomButton title="Se connecter" onPress={login} />
            <CustomLink href="/register" title="S'inscrire"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#RER',
    }
  });