import { Entity, ManyToMany, JoinTable, Column, ManyToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Produtos } from "./Produtos";
import { Carrinho } from "./ShoppingCart";

@Entity() 
export class Carrinho_Cod_Produto_Produtos extends BaseEntity{


    // @ManyToMany(type => Produtos)
    // @JoinTable()
    // produtos: Produtos[];

    @Column()
    quantidade: number;

    @Column({ type: 'varchar', length: 200 })
    nameProduto: string;
    @Entity()


    // @Column()
    // public produtosId!: number;

    // @Column()
    // public carrinhoId!: number;

    @Column()
    public order!: number;

    @ManyToOne(type => Produtos, postProdutos => postProdutos.Carrinho_Cod_Produto)
    public postProdutos!: Produtos;

    @ManyToOne(type => Carrinho, postCarrinho => postCarrinho.Carrinho_Cod_Produto)
    public postCarrinho!: Carrinho;
}

