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

    // @ManyToOne(() => Carrinho, (carrinho) => carrinho.codProduto )
    // public codCarrinho:Carrinho;
    // @ManyToOne(type => Carrinho, carrinho => carrinho.codProduto)
    // codCarrinho: Carrinho;

    @OneToMany((type) => Carrinho_Cod_Produto_Produtos, (postToCarrinho) => postToCarrinho.postCarrinho)
    public Carrinho_Cod_Produto!: Carrinho_Cod_Produto_Produtos[];



    @ManyToOne(() => Mercado, { eager: true })
    codMercado: Mercado;

    // @ManyToOne(() => Imgs, { eager: true })
    // codImg: Imgs;

    @Column({ type: 'varchar', length: 2500 })
    codImg: string;
}

/*id integer not null auto_increment primary key,
codmer integer not null,
codimg integer not null,
foreign key (codmer) references mercado(codmer),
FOREIGN KEY(CODIMG) REFERENCES IMG(codigo),
nome varchar(50) not null,
codprocontrole integer not null,
quantidade integer not null,
preco double not null*/