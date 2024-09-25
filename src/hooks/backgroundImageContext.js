import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ImageBackground } from "react-native";

// Create the context
const BackgroundContext = createContext();

// Background provider component
export const BackgroundProvider = ({ children }) => {
  const [backgroundBase64, setBackgroundBase64] = useState(null);

  // Load background image from AsyncStorage when the app starts
  useEffect(() => {
    (async () => {
      const background = await AsyncStorage.getItem("background");
      if (background) {
        setBackgroundBase64(background);
      }
    })();
  }, []);

  // Function to update the background image and store it in AsyncStorage
  const changeBackground = async (newBackground) => {
    try {
      await AsyncStorage.setItem("background", newBackground);
      setBackgroundBase64(newBackground);
    } catch (error) {
      console.error("Error updating background:", error);
    }
  };

  return (
    <BackgroundContext.Provider value={{ backgroundBase64, changeBackground }}>
      <ImageBackground source={{ uri: backgroundBase64 }} style={{ flex: 1 }}>
        {children}
      </ImageBackground>
    </BackgroundContext.Provider>
  );
};

export default BackgroundContext;
