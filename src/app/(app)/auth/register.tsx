import { useAuth } from "@context/AuthContext";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native"
import CustomTextInput from "@components/CustomTextInput";
import CustomButton from "@components/CustomButton";
import CustomLink from "@components/CustomLink";
import { router } from "expo-router";

export default function LoginScreen() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<String | undefined>(undefined);
    const { onLogin, onRegister } = useAuth();


    const login = async () => {
        const result = await onLogin!( email, password );
        if (result && result.error) {
            setError(result.msg);
        }
    }

    const register = async () => {
        const result = await onRegister!( username, email, password );
        if (result && result.error) {
            setError(result.msg);
        } else {
            login();
        }
    }
    return (
        <View style={styles.container}>
            <CustomTextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />

            <CustomTextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
        
            <CustomTextInput
                style={styles.input}
                placeholder="Mot de passe"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            {error && <Text style={{color: 'red', marginBottom: 10}}>{error}</Text>}
            <CustomButton title="S'inscrire" onPress={login} />
            <CustomButton title="SE CONNECTER" onPress={() => {router.replace('/auth/login')}} style={{backgroundColor: '#afafaf'}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    stepContainer: {
      backgroundColor: 'purple',
      color: 'white',
      alignItems: 'center',
    },
    input: {
      height: 50,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 20,
      paddingLeft: 10,
      fontSize: 16,
    },
  });