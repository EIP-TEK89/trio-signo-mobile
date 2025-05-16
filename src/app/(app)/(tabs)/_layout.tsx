
import { useAuth } from '@context/AuthContext';
import { useTheme } from '@context/ThemeContext';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, useColorScheme, View} from 'react-native';
import HomeIcon from '@assets/components/Navbar/home.svg';
import TrainingIcon from '@assets/components/Navbar/training.svg';
import PlusIcon from '@assets/components/Navbar/plus.svg';

export default function TabLayout() {
  const {authState, onLogout} = useAuth();
  const theme = useTheme();
  const systemTheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.duoBlue,
        tabBarInactiveTintColor: theme.colors.foreground,
        tabBarActiveBackgroundColor: theme.colors.foreground,
        sceneStyle: {
          backgroundColor: theme.colors.background,
        },
        tabBarBackground: () => (
          <View style={{backgroundColor: systemTheme === 'dark'?  theme.colors.foreground: theme.colors.background}} className="absolute inset-0" />
      ),
        tabBarShowLabel: false,
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
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <HomeIcon width={35} height={35}/>
          ),
        }}
      />
      <Tabs.Screen
        name="dictionary"
        options={{
          title: 'Dictionary',
          tabBarIcon: ({ color }) => (
            <TrainingIcon width={35} height={35}/>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <PlusIcon width={35} height={35}/>
          ),
        }}
      />
    </Tabs>
  );
}
