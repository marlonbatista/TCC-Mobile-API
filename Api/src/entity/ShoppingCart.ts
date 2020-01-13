import { BaseEntity } from "./BaseEntity";
import { Entity, Column, ManyToOne, OneToMany, ManyToMany, JoinTable, OneToOne, JoinColumn } from "typeorm";
import { Mercado } from "./Mercado";
import { Produtos } from "./Produtos";
import { CartStatus } from "./Enum/CartShoppingStatus";
import { User } from "./User";
import { Carrinho_Cod_Produto_Produtos } from "./carrinho_cod_produto_produtos";


@Entity()
export class Carrinho extends BaseEntity {

    @OneToMany((type) => Carrinho_Cod_Produto_Produtos, (postToCarrinho) => postToCarrinho.postCarrinho)
    public Carrinho_Cod_Produto!: Carrinho_Cod_Produto_Produtos[];

    @Column()
    statusOrder: CartStatus;

    @Column("boolean")
    compraFinalizada: boolean = false;

    @ManyToOne(() => User, user => user.carrinho)
    codUser: User;
}
