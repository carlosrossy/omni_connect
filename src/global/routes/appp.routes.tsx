import React from "react";

import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import AuthenticationOption from "@features/auth/screens/AuthenticationOption";
import SignIn from "@features/auth/screens/SignIn";
import SignUp from "@features/auth/screens/SignUp";
import CompleteProfile from "@features/auth/screens/completeProfile";
import Home from "@features/Home";

const Stack = createNativeStackNavigator();

export type RootAppRoutesList = {
    Home: undefined;
};

export type AppScreenNavigationProp =
  NativeStackNavigationProp<RootAppRoutesList>;

export default function AppRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}
