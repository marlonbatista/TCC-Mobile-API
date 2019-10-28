import { BaseModel } from './BaseModel';

export class CustomerModel extends BaseModel{
    name:string;
    email:string;
    password:string;    
    photo:string;
    phone:string;
    celphone:string;
    cpf:string;
    rg:string;
    nasc:string;
    cardNumber:string;
    SafyNumber:number;
}