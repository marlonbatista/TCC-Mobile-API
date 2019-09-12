import { BaseEntity } from "./BaseEntity";
import { Entity, ManyToOne } from "typeorm";
import { Carrinho } from "./ShoppingCart";
import { User } from "./User";

@Entity()
export class FinishingCart extends BaseEntity{


    @ManyToOne(() => Carrinho, { eager:true , lazy:true})
    codCarrinho:Carrinho;

    @ManyToOne(() =>User, {eager: true, lazy:true})
    codCliente:User;



}

/*create table finalizaCompra(
codcarrinho integer not null,
nomeCliente varchar(30) not null,
cpf varchar(14) not null,
numerocartao integer not null,
foreign key (codcarrinho) references carrinho (codcarrinho)
);*/