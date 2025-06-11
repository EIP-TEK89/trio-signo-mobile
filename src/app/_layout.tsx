<<<<<<< HEAD
import "../../global.css";
import { AuthProvider } from "@/context/AuthProvider";
import { ThemeProvider } from "@/context/ThemeProvider";
import { Slot, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import '../../global.css'
=======

import { AuthProvider } from "@context/AuthContext";
import { ThemeProvider } from "@context/ThemeContext";
import { Slot, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";

>>>>>>> 89fc775 (feat: add new components and assets for lesson exercises)

export default function RootLayout() {

  return (
<<<<<<< HEAD
=======
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        >
>>>>>>> 89fc775 (feat: add new components and assets for lesson exercises)
      <ThemeProvider>
        <AuthProvider>
          <Slot/>
        </AuthProvider>
      </ThemeProvider>
<<<<<<< HEAD
=======
    </KeyboardAvoidingView>
>>>>>>> 89fc775 (feat: add new components and assets for lesson exercises)
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }});