import { Button, StyleSheet, View } from "react-native";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

interface AuthProps {
  authState?: {token: string | null; authenticated: boolean | null};
  loading?: boolean;
  onRegister?: (username: string, email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const AuthContext = createContext<AuthProps>({})

export const AuthProvider = ({children}: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null
  }>({
    token: null,
    authenticated: null
  });
  const API_URL = process.env.EXPO_PUBLIC_API_URL;
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    }
    loadToken();
  }, []);

  const register = async (username: string, email: string, password: string) => {
    try {
      return await axios.post(API_URL + "/auth/sign-up", {username, email, password});
    } catch (e) {
      return {error: true, msg: e.message} 
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await axios.post(API_URL + "/auth/login", {email, password});
      setAuthState({
        token: result.data.token,
        authenticated: true
      });

      axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.accessToken}`;

      console.log(result.data.accessToken)
      await SecureStore.setItemAsync('token', result.data.accessToken);

      return result;
    } catch (e) {
      console.log(e)
      return {error: true, msg: e.message} 
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
    authState,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

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