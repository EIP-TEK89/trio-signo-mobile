import { createContext, useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { loginUser, logoutUser, registerUser } from "@/services/authServices";
import { User } from "@/types/UserInterface";
import apiClient from "@/services/apiClient";
import { router } from "expo-router";
import { updateCurrentUser } from "@/services/userServices";

interface AuthProps {
  authState?: {accessToken: string | null; refreshToken: string | null; user: User | null, authenticated: boolean | null};
  loading?: boolean;
  onRegister?: (username: string, email: string, password: string, firstName?: string, lastName?: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
  onUpdate?: (username: string, email: string, firstName?: string, lastName?: string, avatarUrl?: string) => Promise<any>;
  onDelete?: () => Promise<any>;
}

const AuthContext = createContext<AuthProps>({})

export const AuthProvider = ({children}: any) => {
  const [authState, setAuthState] = useState<{
    accessToken: string | null;
    refreshToken: string | null;
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

  const updateUser = useCallback(async (username: string, email: string, firstName?: string, lastName?: string, avatarUrl?: string) => {
    const result = await updateCurrentUser({avatarUrl, firstName, lastName, username, email})
  
    if (result === null)
      return null

    setAuthState({
      ...authState,
      user: result
    })
    await SecureStore.setItemAsync('user', JSON.stringify(result));
    return result
  }, [authState])

  const deleteUser = useCallback(async () => {
    const result = await deleteUser()

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
    return (result)
  }, [])

  const register = useCallback(async (username: string, email: string, password: string, firstName?: string, lastName?: string) => {
    const result = await registerUser({username, email, password, firstName, lastName});
    
    if (result === null)
      return null;
    
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

    router.push("/(app)/(tabs)")
    return result;
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const result = await loginUser({email, password});
    if (result === null) {
      return null;
    }
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

    router.push("/(app)/(tabs)")
    return result;
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
    onUpdate: updateUser,
    onDelete: deleteUser,
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