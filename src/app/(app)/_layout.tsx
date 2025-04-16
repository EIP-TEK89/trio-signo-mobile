
import Block from '@components/Block';
import { useAuth } from '@context/AuthContext';
import { Redirect, Slot, Tabs } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';

export default function LogLayout() {
  const {authState, loading, onLogout} = useAuth();

  if (loading) {
    return (
      <Block style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: '#fff'}}>Loading...</Text>
      </Block>
    );
  }
  return (
      !authState?.authenticated ? <Redirect href={"/login"}/> : <Slot />
  );
}
