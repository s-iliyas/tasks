"use client";

import { createContext, useState } from "react";

// Define the type for the properties passed to the ThemeProvider component
type AppProps = {
  children: React.ReactNode;
};

// Define the type for the context value, which includes darkMode state
export type ThemeContextProp = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

// Create a new React context for managing the theme
export const ThemeContext = createContext<ThemeContextProp | null>(null);

// Define the ThemeProvider component, which will wrap your app with the context
export const ThemeProvider = ({ children }: AppProps) => {
  // Initialize the darkMode state using the useState hook
  const [darkMode, setDarkMode] = useState(true);

  // Provide the darkMode state and setDarkMode function to the context
  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
