import axios, { AxiosPromise } from "axios";
interface IAddress {
  cep?: string;
  localidade: string;
  uf: string;
  bairro: string;
  logradouro: string;
  complemento?: string;
  erro?: boolean;
}
class ViaCep {
  static searchCep(cep: string): AxiosPromise<IAddress> {
    return axios.get(`https://viacep.com.br/ws/${cep}/json/`);
  }
}

export default ViaCep;
