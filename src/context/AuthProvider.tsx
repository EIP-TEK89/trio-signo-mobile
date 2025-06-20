import { createContext, useCallback, useContext, useEffect, useState } from "react";
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
      const result = await axios.post(process.env.EXPO_PUBLIC_API_URL + "/auth/register", {username, email, password});
      setAuthState({
        token: result.data.token,
        authenticated: true
      });
      axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.accessToken}`;

      await SecureStore.setItemAsync('token', result.data.accessToken);

      return result;
    } catch (e) {
      return {error: true, msg: e.message} 
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await axios.post(process.env.EXPO_PUBLIC_API_URL + "/auth/login", {email, password});
      setAuthState({
        token: result.data.token,
        authenticated: true
      });

      axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.accessToken}`;

      await SecureStore.setItemAsync('token', result.data.accessToken);

      return result;
    } catch (e) {
      console.error(e)
      return {error: true, msg: e.message} 
    }
  };

  const logout = useCallback(async () => {
    await SecureStore.deleteItemAsync('token');

    axios.defaults.headers.common['Authorization'] = '';

    setAuthState({
      token: null,
      authenticated: false
    });
  }, []);

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