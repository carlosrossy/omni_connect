import api from "../../../global/config/api";

export interface ICompleteProfileData {
  userID: string;
  token: string;
  cpf: string;
  sex: string;
  birthDate: string;
  phone: string;
  postalCode: string;
  adress: string;
  adressNumber: string;
  complement: string;
  neighborhood: string;
  uf: string;
  city: string;
}

export async function completeProfile({
  userID,
  token,
  cpf,
  sex,
  birthDate,
  phone,
  postalCode,
  adress,
  adressNumber,
  complement,
  neighborhood,
  uf,
  city,
}: ICompleteProfileData) {
  const response = await api.post<ICompleteProfileData>(
    `/user/${userID}/full-user-registration`,
    {
      cpf,
      sex,
      birthDate,
      phone,
      postalCode,
      adress,
      adressNumber,
      complement,
      neighborhood,
      uf,
      city,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}
