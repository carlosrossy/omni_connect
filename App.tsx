import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import React from "react";

import { ActivityIndicator, View } from "react-native";

import { AppProvider } from "@global/context";
import Routes from "@global/routes";

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
        <ActivityIndicator color={"#0086FF"} />
      </View>
    );
  }
  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  );
}
