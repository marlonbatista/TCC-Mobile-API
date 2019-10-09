import { BaseModel } from './BaseModel';

export class UserModel extends BaseModel{
    name:string;
    lastname:string;
    city:string;
    phone:string;
    photo:string;
    celphone:string;
    cpf:string;
    rg:string;
    nasc:string;
    cardNumber:string;
    SafyNumber:number;
    sex:string;
    carrinho:string[];
    email:string;
    isRoot:boolean;
    password:string;

}