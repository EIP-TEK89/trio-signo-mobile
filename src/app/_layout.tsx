import "../../global.css";
import { AuthProvider } from "@/context/AuthProvider";
import { ThemeProvider } from "@/context/ThemeProvider";
import { Slot, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import '../../global.css'

export default function RootLayout() {

  return (
      <ThemeProvider>
        <AuthProvider>
          <Slot/>
        </AuthProvider>
      </ThemeProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }});