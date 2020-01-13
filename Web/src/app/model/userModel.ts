import { BaseModel } from './baseModel';

export class UserModel extends BaseModel {
  name: string;
  photo: string
  email: string;
  password: string;
  description: string;
  RazaoSocial: string;
  cnpj: string;
  address: string;
  addressComplement: string;
  state: string;
  city: string;
  zipCode: string;
  citiesCare: string;
  phone: string;
  codprocontrole: string
}
