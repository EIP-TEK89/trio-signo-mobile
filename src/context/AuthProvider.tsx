import { createContext, useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { loginUser, logoutUser, registerUser } from "@/services/authServices";
import { User } from "@/types/UserInterface";
import apiClient from "@/services/apiClient";

interface AuthProps {
  authState?: {accessToken: string | null; refreshToken: string | null; user: User | null, authenticated: boolean | null};
  loading?: boolean;
  onRegister?: (username: string, email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const AuthContext = createContext<AuthProps>({})

export const AuthProvider = ({children}: any) => {
  const [authState, setAuthState] = useState<{
    accessToken: string | null;
    refreshToken?: string | null;
    user: User | null;
    authenticated: boolean | null
  }>({
    accessToken: null,
    refreshToken: null,
    user: null,
    authenticated: null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync('token');
      const refreshToken = await SecureStore.getItemAsync('refreshToken');
      const user = await SecureStore.getItemAsync('user');

      if (token) {        
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        setAuthState({
          accessToken: token,
          refreshToken: refreshToken,
          user: user ? JSON.parse(user) : null,
          authenticated: true
        });
      }
      setLoading(false);
    };
    loadToken();
  }, []);

  const register = useCallback(async (username: string, email: string, password: string) => {
    try {
      const result = await registerUser({username, email, password});
      setAuthState({
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        user: result.user,
        authenticated: true
      });
      axios.defaults.headers.common['Authorization'] = `Bearer ${result.accessToken}`;

      await SecureStore.setItemAsync('token', result.accessToken);
      await SecureStore.setItemAsync('refreshToken', result.refreshToken);
      await SecureStore.setItemAsync('user', JSON.stringify(result.user));

      return result;
    } catch (e) {
      return {error: true, msg: e.message} 
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const result = await loginUser({email, password});
      setAuthState({
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        user: result.user,
        authenticated: true
      });

      apiClient.defaults.headers.common['Authorization'] = `Bearer ${result.accessToken}`;

      await SecureStore.setItemAsync('token', result.accessToken);
      await SecureStore.setItemAsync('refreshToken', result.refreshToken);
      await SecureStore.setItemAsync('user', JSON.stringify(result.user));

      return result;
    } catch (e) {
      console.error(e)
      return {error: true, msg: e.message} 
    }
  }, []);

  const logout = useCallback(async () => {
    const result = await logoutUser();
    await SecureStore.deleteItemAsync('token');
    await SecureStore.deleteItemAsync('refreshToken');
    await SecureStore.deleteItemAsync('user');

    axios.defaults.headers.common['Authorization'] = '';

    setAuthState({
      accessToken: null,
      refreshToken: null,
      user: null,
      authenticated: false
    });
    return result;
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