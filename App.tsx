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
import Toast, {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from "react-native-toast-message";
import { queryClient } from "@global/config/react-query";
import { QueryClientProvider } from "@tanstack/react-query";

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

  const toastConfig = {
    success: (props: BaseToastProps) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: "#5FE787" }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 15,
        }}
        text2Style={{
          fontSize: 15,
        }}
      />
    ),

    error: (props: BaseToastProps) => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 15,
        }}
        text2Style={{
          fontSize: 15,
        }}
      />
    ),
  };
  return (
    <AppProvider>
      <QueryClientProvider client={queryClient}>
        <Routes />
        <Toast config={toastConfig}/>
      </QueryClientProvider>
    </AppProvider>
  );
}
