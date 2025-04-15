import React, { useState, useContext, createContext } from "react";

interface ThemeContextType {
  colors: 
  {
    duoBlue: string;
    duoGreen: string;
    duoPurple: string;
    duoRed: string;
    duoOrange: string;
    duoYellow: string;
    foreground: string;
    mutedForeground: string;
    background: string;
    muted: string;
    border: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState<ThemeContextType>({
    colors: {
        'duoBlue': '#1cb0f6',
        'duoGreen': '#58cc02',
        'duoPurple': '#ce82ff',
        'duoRed': '#ff4b4b',
        'duoOrange': '#ff9600',
        'duoYellow': '#ffc800',
        
        'foreground': '#333',
        'mutedForeground': '#666',
        'background': '#fff',
        'muted': '#f5f5f5',
        'border': '#e5e5e7',
      }
});


  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
