
import { useAuth } from 'context/AuthContext';
import { Redirect, Slot, Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  const {authState, onLogout} = useAuth();

  return (
    !authState?.authenticated ? <Slot /> : <Slot />
  );
}
