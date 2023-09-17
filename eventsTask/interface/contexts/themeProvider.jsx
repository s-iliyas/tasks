/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(false);

  return (
    <ThemeContext.Provider value={{themeMode, setThemeMode}}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
