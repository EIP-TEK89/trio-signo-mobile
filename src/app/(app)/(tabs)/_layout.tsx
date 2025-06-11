
<<<<<<< HEAD
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
=======
import { useAuth } from '@context/AuthContext';
import { useTheme } from '@context/ThemeContext';
import { Redirect, Slot, Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

export default function TabLayout() {
  const {authState, onLogout} = useAuth();
  const theme = useTheme();
>>>>>>> 89fc775 (feat: add new components and assets for lesson exercises)

  return (
    <Tabs
      screenOptions={{
<<<<<<< HEAD
        
        headerPressColor: 'transparent',
        tabBarShowLabel: false,
=======
        tabBarActiveTintColor: theme.colors.duoBlue,
        tabBarInactiveTintColor: theme.colors.mutedForeground,
        tabBarActiveBackgroundColor: theme.colors.background,
>>>>>>> 89fc775 (feat: add new components and assets for lesson exercises)
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
<<<<<<< HEAD
          default: {
            backgroundColor: themeValues[colorScheme]['--background'],
            height: 130,
            paddingTop: 20,
          },
=======
          default: {},
>>>>>>> 89fc775 (feat: add new components and assets for lesson exercises)
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
<<<<<<< HEAD
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
=======
          title: 'Home'
>>>>>>> 89fc775 (feat: add new components and assets for lesson exercises)
        }}
      />
      <Tabs.Screen
        name="dictionary"
        options={{
<<<<<<< HEAD
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
=======
          title: 'Dictionary'
>>>>>>> 89fc775 (feat: add new components and assets for lesson exercises)
        }}
      />
    </Tabs>
  );
}
