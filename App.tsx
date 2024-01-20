import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import theme from "./src/global/styles/theme";
import { ThemeProvider } from "styled-components";
import AuthenticationOption from "@features/auth/AuthenticationOption";

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });
  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator color={"#0062E5"} />
      </View>
    );
  }
  return (
    <ThemeProvider theme={theme}>
      <AuthenticationOption />
    </ThemeProvider>
  );
}
