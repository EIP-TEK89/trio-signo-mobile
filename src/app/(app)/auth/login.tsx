import { useAuth } from "@context/AuthContext";
import { Link, Redirect, router } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native"
import CustomTextInput from "@components/CustomTextInput";
import CustomButton from "@components/CustomButton";
import Block from "@components/Block";

export default function LoginScreen() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<String | undefined>(undefined);
    const { onLogin, onRegister } = useAuth();

    const login = async () => {
        const result = await onLogin( email, password );
        if (result && result.error) {
            setError(result.msg);
        }
    }

    return (
        <Block style={styles.container}>
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
            />
            {error && <Text style={{color: 'red', marginBottom: 10}}>{error}</Text>}
            <CustomButton title="SE CONNECTER" onPress={login} />
            <CustomButton title="S'INSCRIRE" onPress={() => {router.replace('/auth/register')}} style={{backgroundColor: '#afafaf'}}/>
        </Block>
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
    error: {
        color: 'red',
        marginBottom: 10,}
  });