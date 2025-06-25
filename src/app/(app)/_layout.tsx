
import Loading from '@/components/Ui/Loading';
import { useAuth } from '@/context/AuthProvider';
import { Redirect, Slot } from 'expo-router';
import React from 'react';

export default function LogLayout() {
  const {authState, loading} = useAuth();

  if (loading) {
    return (
      <Loading />
    );
  }
  return (
      !authState?.authenticated ? <Redirect href={"/welcomeScreen"}/> : <Slot />
  );
}
