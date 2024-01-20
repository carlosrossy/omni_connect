import React from "react";

import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import AuthenticationOption from "@features/auth/AuthenticationOption";

const Stack = createNativeStackNavigator();

export type RootAuthRoutesList = {
  AuthenticationOption: undefined;
};

export type AuthScreenNavigationProp =
  NativeStackNavigationProp<RootAuthRoutesList>;

export default function AuthRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="AuthenticationOption"
        component={AuthenticationOption}
      />
    </Stack.Navigator>
  );
}
