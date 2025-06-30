
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, TouchableOpacity, View} from 'react-native';
import { useColorScheme } from 'nativewind';
import { themeValues } from '@/constants/colorTheme';
import { Home, Puzzle, MoreHorizontal } from 'lucide-react-native';

export default function TabLayout() {
  const {colorScheme} = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        
        headerPressColor: 'transparent',
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {
            backgroundColor: themeValues[colorScheme]['--background'],
            height: 130,
            paddingTop: 20,
          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarButton: ( props ) => {
            return (
              <TouchableOpacity activeOpacity={1} onPress={props.onPress}>
                <View style={props.style}>{props.children}</View>
              </TouchableOpacity>
            );
          },
          tabBarIcon: ({ focused }) => (
            <View className={focused && "p-1 rounded-xl border-2 border-duoGreen bg-darkenedDuoGreen "}>
              <Home size={30} color={"#4ADE80"}/>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="dictionary"
        options={{
          title: 'Dictionary',
          tabBarButton: ( props ) => {
            return (
              <TouchableOpacity activeOpacity={1} onPress={props.onPress}>
                <View style={props.style}>{props.children}</View>
              </TouchableOpacity>
            );
          },
          tabBarIcon: ({ focused }) => (
            <View className={focused && "p-1 rounded-xl border-2 border-duoGreen bg-darkenedDuoGreen "}>
              <Puzzle size={30} color={"#63b3ed"}/>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarButton: ( props ) => {
            return (
              <TouchableOpacity activeOpacity={1} onPress={props.onPress}>
                <View style={props.style}>{props.children}</View>
              </TouchableOpacity>
            );
          },
          tabBarIcon: ({ focused }) => (
            <View className={focused && "p-1 rounded-xl border-2 border-duoGreen bg-darkenedDuoGreen "}>
              <MoreHorizontal size={30} color={"#b794f4"}/>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
