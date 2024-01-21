interface IUser {
  id: string;
  name: string;
  email: string;
  role: string;
  birth_date: string;
  cpf: string;
  phone: string;
  sex: string;
  created_at: string;
  updated_at: string;
  adress: {
    id: string;
    postal_code: string;
    adress: string;
    adress_number: string;
    complement: string;
    neighborhood: string;
    uf: string;
    city: string;
    user_id: string;
    created_at: string;
    updated_at: string;
  };
}
