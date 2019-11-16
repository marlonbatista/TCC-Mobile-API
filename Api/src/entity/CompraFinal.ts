import { Entity, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { Mercado } from "./Mercado";
import { BaseEntity } from "./BaseEntity";
import { Carrinho } from "./ShoppingCart";
import { User } from "./User";

@Entity()
export class CompraFinal extends BaseEntity{

    @OneToOne(type => Carrinho)
    @JoinColumn()
    carrinho: Carrinho;

    @ManyToOne(() => Mercado, { eager: true })
    mercado: Mercado;
    

    @ManyToOne(() => User, user => user.compra)
    user: User;

    

}