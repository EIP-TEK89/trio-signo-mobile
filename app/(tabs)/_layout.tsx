import { Stack, Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {

  return (
    <Stack
      initialRouteName='index'
      screenOptions={{
        headerShown: false,
        
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(courses)"
        options={{
          title: 'Courses',
          headerShown: false,
        }}
      />
    </Stack>
  );
}
