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
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number: string;
  complement: string;
}
  
  