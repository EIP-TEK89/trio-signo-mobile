
import { useAuth } from '@/context/AuthProvider';
import { useTheme } from '@/context/ThemeProvider';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, useColorScheme, View} from 'react-native';
import HomeIcon from '@assets/components/Navbar/home.svg';
import TrainingIcon from '@assets/components/Navbar/training.svg';
import PlusIcon from '@assets/components/Navbar/plus.svg';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
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
