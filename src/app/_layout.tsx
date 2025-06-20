import "../../global.css";
import { AuthProvider } from "@/context/AuthProvider";
import { ThemeProvider } from "@/context/ThemeProvider";
import { Slot } from "expo-router";

export default function RootLayout() {

  return (
      <ThemeProvider>
        <AuthProvider>
          <Slot/>
        </AuthProvider>
      </ThemeProvider>
  )
}
