
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, TouchableOpacity, TouchableWithoutFeedbackComponent, View} from 'react-native';
import HomeIcon from '@assets/components/Navbar/home.svg';
import TrainingIcon from '@assets/components/Navbar/training.svg';
import PlusIcon from '@assets/components/Navbar/plus.svg';
import { useColorScheme } from 'nativewind';
import { themeValues } from '@/utils/ColorTheme';
import { useTheme } from '@/context/ThemeProvider';

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
            <View className={focused && "p-1 rounded-xl border-2 border-duoBlue bg-darkenedDuoBlue "}>
              <HomeIcon width={40} height={40}/>
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
            <View className={focused && "p-1 rounded-xl border-2 border-duoBlue bg-darkenedDuoBlue "}>
              <TrainingIcon width={40} height={40}/>
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
            <View className={focused && "p-1 rounded-xl border-2 border-duoBlue bg-darkenedDuoBlue "}>
              <PlusIcon width={40} height={40}/>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
        }}
      />
    </Tabs>
  );
}
