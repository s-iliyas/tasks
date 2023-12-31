"use client";

import { useContext } from "react";
import { Provider } from "react-redux";

import { store } from "@/store";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ThemeContext, ThemeProvider } from "@/contexts/ThemeProvider";

const MainComponent = ({ children }: { children: React.ReactNode }) => {
  const theme = useContext(ThemeContext);

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: theme?.darkMode ? "#000000" : "#FFFFFF",
        color: theme?.darkMode ? "#FFFFFF" : "#000000",
      }}
    >
      {children}
    </div>
  );
};

const MainProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <MainComponent>
          <Navbar />
          {children}
          <Footer />
        </MainComponent>
      </ThemeProvider>
    </Provider>
  );
};

export default MainProvider;
