import { ThemeProvider } from "@react-navigation/native";
import { AuthProvider } from "context/AuthContext";
import { Slot, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";


export default function RootLayout() {

  return (
    <View style={styles.container}>
      <AuthProvider><Slot/></AuthProvider>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#4b4b4b',
  }});