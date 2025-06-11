import { Button, StyleSheet, View } from "react-native";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import SecureStore from "expo-secure-store";

interface AuthProps {
  authState?: {token: string | null; authenticated: boolean | null};
  onRegister?: (username: string, email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const AuthContext = createContext<AuthProps>({})

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthProvider = ({children}: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null
  }>({
    token: null,
    authenticated: null
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync('token');

      if (token) {        
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        setAuthState({
          token,
          authenticated: true
        });
      }
    }
    loadToken();
  }, []);

  const register = async (username: string, email: string, password: string) => {
    try {
      return await axios.post("http://localhost:3000/api/auth/sign-up", {username, email, password});
    } catch (e) {
      return {error: true, msg: (e as any).response.data.msg} 
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await axios.post("http://localhost:3000/api/auth/log-in", {email, password});

      setAuthState({
        token: result.data.token,
        authenticated: true
      });

      axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;

      await SecureStore.setItemAsync('token', result.data.token);

      return result;
    } catch (e) {
      return {error: true, msg: (e as any).response.data.msg} 
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('token');

    axios.defaults.headers.common['Authorization'] = '';

    setAuthState({
      token: null,
      authenticated: false
    });
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
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