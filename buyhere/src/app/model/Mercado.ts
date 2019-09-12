import { BaseModel } from './BaseModel';

export class MercadoModel extends BaseModel{
    
    name:string;
    photo:string
    email:string;
    password:string;
    description:string;
    RazaoSocial:string;
    cnpj:string;
    address:string;
    addressComplement:string;
    state:string;
    city:string;
    zipCode:string;
    citiesCare:string;
    categoryCare:string;
    phone:string;
    codprocontrole:string
}