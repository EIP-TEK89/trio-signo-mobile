
import AppView from '@/components/Ui/AppView';
import Loading from '@/components/Ui/Loading';
import { useAuth } from '@/context/AuthProvider';
import { Redirect, Slot } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';

export default function LogLayout() {
  const {authState, loading} = useAuth();

  if (loading) {
    return (
      <Loading />
    );
  }
  return (
      !authState?.authenticated ? <Redirect href={"/login"}/> : <Slot />
  );
}
