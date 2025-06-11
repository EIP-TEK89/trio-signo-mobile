
import AppView from '@/components/Ui/AppView';
import { useAuth } from '@/context/AuthProvider';
import { Redirect, Slot, Tabs } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';

export default function LogLayout() {
  const {authState, loading, onLogout} = useAuth();

  if (loading) {
    return (
      <AppView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: '#fff'}}>Loading...</Text>
      </AppView>
    );
  }
  return (
      !authState?.authenticated ? <Redirect href={"/login"}/> : <Slot />
  );
}
