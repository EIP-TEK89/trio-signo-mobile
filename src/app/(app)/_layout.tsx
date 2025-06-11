
<<<<<<< HEAD
import AppView from '@/components/Ui/AppView';
import { useAuth } from '@/context/AuthProvider';
=======
import Block from '@components/Block';
import { useAuth } from '@context/AuthContext';
>>>>>>> 89fc775 (feat: add new components and assets for lesson exercises)
import { Redirect, Slot, Tabs } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';

export default function LogLayout() {
  const {authState, loading, onLogout} = useAuth();

  if (loading) {
    return (
<<<<<<< HEAD
      <AppView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: '#fff'}}>Loading...</Text>
      </AppView>
    );
  }
  return (
      !authState?.authenticated ? <Redirect href={"/login"}/> : <Slot />
=======
      <Block style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: '#fff'}}>Loading...</Text>
      </Block>
    );
  }
  return (
      !authState?.authenticated ? <Redirect href={"/(app)/auth/login"}/> : <Slot />
>>>>>>> 89fc775 (feat: add new components and assets for lesson exercises)
  );
}
