import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput } from 'react-native';
import { View } from 'react-native';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState<string>('');
  const [passConfirmation, setpassConfirmation] = useState('');
  const [errors, setErrors] = useState<{ username?: string; email?: string; password?: string; apiError?: string }>({});

  const handleRegistration = async () => {
    if (password !== passConfirmation) {
      setErrors((prevErrors) => ({ ...prevErrors, apiError: 'Les mots de passe ne matchent pas' }));
    }
    try {

      const response = await fetch("http://localhost:3000/api/auth/sign-up", {
        method: "POST",
        headers: {
          "accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          email,
          password
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error creating user');
      }

      const data = await response.json();
      console.log('User created successfully:', data);

    } catch (error: any) {
      setErrors((prevErrors) => ({ ...prevErrors, apiError: error.message }));
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setpassConfirmation}
        secureTextEntry
      />
      <Button title="Se connecter" onPress={handleRegistration} />
      <Text style={styles.error}>
        {errors.apiError}
      </Text>
    </View>
  );
}

export default Signup;

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
  error: {
    color: 'red',
    marginBottom: 20,
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