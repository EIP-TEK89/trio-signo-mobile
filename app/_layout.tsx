import { ThemeProvider } from "@react-navigation/native";
import { AuthProvider } from "context/AuthContext";
import { Slot, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";


export default function RootLayout() {

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      >
      <AuthProvider><Slot/></AuthProvider>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }});