import { useState } from 'react';
import { Button, StyleSheet, TextInput , View } from 'react-native';


function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [, setErrors] = useState<{ username?: string; email?: string; password?: string; apiError?: string }>({});

  const handleConnexion = async () => {
    try {
    
      const response = await fetch("http://localhost:3000/api/auth/log-in", {
        method: "POST",
        headers: {
          "accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
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

      <Button title="Se connecter" onPress={handleConnexion} />
    </View>
  );
}

export default SignIn;

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