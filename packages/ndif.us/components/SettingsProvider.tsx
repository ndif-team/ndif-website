"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

interface SettingsContextType {
  isAnimationEnabled: boolean;
  toggleAnimation: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [isAnimationEnabled, setIsAnimationEnabled] = useState(true);

  const toggleAnimation = () => {
    setIsAnimationEnabled((prev) => !prev);
  };

  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem>
      <SettingsContext.Provider value={{ isAnimationEnabled, toggleAnimation }}>
        {children}
      </SettingsContext.Provider>
    </NextThemesProvider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
