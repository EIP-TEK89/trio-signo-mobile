import React, { useState, useContext, createContext } from "react";

interface ThemeContextType {
  colors: 
  {
    duoBlue: string;
    darkenedDuoBlue: string;
    duoGreen: string;
    darkenedDuoGreen: string;
    duoPurple: string;
    darkenedDuoPurple: string;
    duoRed: string;
    darkenedDuoRed: string;
    duoOrange: string;
    darkenedDuoOrange: string;
    duoYellow: string;
    darkenedDuoYellow: string;
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
        'darkenedDuoBlue': '#1a9ae0',
        'duoGreen': '#58cc02',
        'darkenedDuoGreen': '#4cae02',
        'duoPurple': '#ce82ff',
        'darkenedDuoPurple': '#b76de0',
        'duoRed': '#ff4b4b',
        'darkenedDuoRed': '#e03a3a',
        'duoOrange': '#ff9600',
        'darkenedDuoOrange': '#e08c00',
        'duoYellow': '#ffc800',
        'darkenedDuoYellow': '#e0b800',
        
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
