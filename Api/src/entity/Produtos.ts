import { Entity, Column, ManyToOne, ManyToMany, OneToMany } from "typeorm";
import { Carrinho } from "./ShoppingCart";
import { BaseEntity } from "./BaseEntity";
import { Mercado } from "./Mercado";
import { Imgs } from "./Img";
import { Carrinho_Cod_Produto_Produtos } from "./carrinho_cod_produto_produtos";

@Entity()
export class Produtos extends BaseEntity {

    @Column({ type: 'varchar', length: 500 })
    name: string;

    @Column()
    codigocontrole: number;

    @Column({ type: 'decimal', precision: 5, scale: 2, default: 0, nullable: true })
    precoPromocao: number;

    @Column({ type: 'decimal', precision: 5, scale: 2, default: 0, })
    precoNormal: number;

    @Column()
    estoque: number;

    @OneToMany((type) => Carrinho_Cod_Produto_Produtos, (postToCarrinho) => postToCarrinho.postCarrinho)
    public Carrinho_Cod_Produto!: Carrinho_Cod_Produto_Produtos[];

    @ManyToOne(() => Mercado, { eager: true })
    codMercado: Mercado;

    @Column({ type: 'varchar', length: 2500 })
    codImg: string;
}
