import {Entity,  Column, OneToMany} from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Carrinho } from "./ShoppingCart";

@Entity() //{ name: 'User'}
export class User extends BaseEntity {

    

    @Column({type:'varchar',length:100})
    name:string;

    @Column({type:'varchar',length:100})
    lastname:string;
    
    @Column({type:'varchar',length:100})
    city:string;

    @Column({type:'varchar',length:100})
    phone:string;

    @Column({type:'varchar',length:100})
    celphone:string;

    @Column({type:'varchar',length:100})
    cpf:string;

    @Column({type:'varchar',length:100})
    rg:string;

    @Column({type:'varchar',length:100})
    nasc:string;

    @Column({type:'varchar',length:100})
    cardNumber:string;

    @Column({type:'varchar',length:3})
    SafyNumber:number;

    @Column({type:'varchar',length:10})
    sex:string;

    @OneToMany(() =>Carrinho,carrinho => carrinho.codUser)
    carrinho:Carrinho[];

    @Column({type:'varchar', length:200})
    email:string;

    @Column({default:false})
    isRoot:boolean;

    @Column({type:'varchar', length:200})
    password:string;

    

   

    

}
