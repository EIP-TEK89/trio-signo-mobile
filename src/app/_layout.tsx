import "../../global.css";
import { AuthProvider } from "@context/AuthContext";
import { ThemeProvider } from "@context/ThemeContext";
import { Slot, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from "react-native";
import '../../global.css'

export default function RootLayout() {

  return (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        >
      <ThemeProvider>
        <AuthProvider>
          <Slot/>
        </AuthProvider>
      </ThemeProvider>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }});