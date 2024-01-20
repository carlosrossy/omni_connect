export interface ISignInCredentials {
    email: string;
    password: string;
  }
export interface ISignUpData {
  name: string;
  email: string;
  emailConfirmation: string;
  password: string;
  passwordConfirmation: string;
}

export interface ICompleteProfileData {
  cpf: string;
  sex: string;
  birthDate: Date;
  phone: string;
  postalCode: string;
  adress: string;
  adressNumber: string;
  complement: string;
  neighborhood: string;
  uf: string;
  city: string;
}
  
  