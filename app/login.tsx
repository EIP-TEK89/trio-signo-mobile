import { useAuth } from "context/AuthContext";
import { Link, Redirect, router } from "expo-router";
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
            <Text style={styles.title}>Connexion</Text>
            <CustomTextInput
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
        
            <CustomTextInput
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <CustomButton title="SE CONNECTER" onPress={login} />
            <CustomButton title="S'INSCRIRE" onPress={() => {router.replace('/register')}} style={{backgroundColor: '#afafaf'}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D1117',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: 30,
      },
  });