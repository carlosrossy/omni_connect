import React from "react";
import AuthRoutes from "./auth.routes";
import { useAuth } from "@global/context/userAuth";
import AppRoutes from "./appp.routes";

export default function Routes() {
  const { userCredentials } = useAuth();
  const hasCPF = userCredentials && userCredentials.cpf;

  return hasCPF ? <AppRoutes /> : <AuthRoutes />;
}
