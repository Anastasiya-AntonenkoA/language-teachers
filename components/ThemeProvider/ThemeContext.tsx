"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = {
  color: string;
  bgLight: string;
  image: string;
};

export const themes: Theme[] = [
  { color: "#F4C550", bgLight: "#FBE9BA", image: "/images/yellow.png" },
  { color: "#9FBAAE", bgLight: "#CBDED3", image: "/images/green.png" },
  { color: "#9FB7CE", bgLight: "#BFD6EA", image: "/images/blue.png" },
  { color: "#E0A39A", bgLight: "#F2C0BD", image: "/images/red.png" },
  { color: "#F0AA8D", bgLight: "#F4C8BA", image: "/images/orange.png" },
];

interface ThemeContextType {
  currentThemeIdx: number;
  setTheme: (index: number) => void;
  currentTheme: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [currentThemeIdx, setCurrentThemeIdx] = useState(0);

  useEffect(() => {
      const saved = localStorage.getItem("selectedThemeIdx");
      // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved !== null) setCurrentThemeIdx(parseInt(saved, 10));
  }, []);

  useEffect(() => {
    const theme = themes[currentThemeIdx];
    document.documentElement.style.setProperty('--main-color', theme.color);
    document.documentElement.style.setProperty('--bg-light', theme.bgLight);
    localStorage.setItem("selectedThemeIdx", currentThemeIdx.toString());
  }, [currentThemeIdx]);

  return (
    <ThemeContext.Provider value={{ currentThemeIdx, setTheme: setCurrentThemeIdx, currentTheme: themes[currentThemeIdx] }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};