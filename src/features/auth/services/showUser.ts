import api from "../../../global/config/api";

export interface IshowUser {
  token: string;
}

export async function showUser({ token }: IshowUser) {;
  const response = await api.get(`/user-logged`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
