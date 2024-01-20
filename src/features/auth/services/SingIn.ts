import api from "../../../global/config/api";
import { ISignInCredentials } from "../models/auth";

interface ISingIn {
  email: string;
  password: string;
}

export async function singIn({ email, password }: ISingIn) {
  const response = await api.post<ISignInCredentials>(`/auth/signin`, {
    email,
    password,
  });
  return response.data;
}
