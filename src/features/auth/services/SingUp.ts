import api from "../../../global/config/api";

export interface ICreate {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export async function singUp({
  email,
  name,
  password,
  passwordConfirmation,
}: ICreate) {
  const response = await api.post<ICreate>(`/auth/signup`, {
    email,
    name,
    password,
    passwordConfirmation,
  });
  return response.data;
}
