
import { useAuth } from '@context/AuthContext';
import { useTheme } from '@context/ThemeContext';
import { Redirect, Slot, Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

export default function TabLayout() {
  const {authState, onLogout} = useAuth();
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.duoBlue,
        tabBarInactiveTintColor: theme.colors.mutedForeground,
        tabBarActiveBackgroundColor: theme.colors.background,
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home'
        }}
      />
      <Tabs.Screen
        name="dictionary"
        options={{
          title: 'Dictionary'
        }}
      />
    </Tabs>
  );
}
