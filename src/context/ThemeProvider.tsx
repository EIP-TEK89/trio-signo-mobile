// src/shared-components/providers/ThemeProvider.tsx
import React, { createContext, useContext } from "react";
import { View } from "react-native";
import { themes } from "@utils/ColorTheme";
import { useColorScheme } from "nativewind";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { colorScheme } = useColorScheme();

  return (
    <ThemeContext.Provider value={{ theme: colorScheme }}>
      <View style={themes[colorScheme]} className="flex-1">
        {children}
      </View>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
