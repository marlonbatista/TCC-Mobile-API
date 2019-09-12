import { Entity, Column, ManyToOne, ManyToMany } from "typeorm";
import { Carrinho } from "./ShoppingCart";
import { BaseEntity } from "./BaseEntity";
import { Mercado } from "./Mercado";
import { Imgs } from "./Img";



@Entity()
export class Produtos extends BaseEntity {

    @Column({ type: 'varchar', length: 500 })
    name: string;

    @Column()
    codigocontrole: number;

    @Column({ nullable: true })
    precoPromocao: number;

    @Column()
    precoNormal: number;

    @Column()
    estoque:number;

    // @ManyToOne(() => Carrinho, (carrinho) => carrinho.codProduto )
    // public codCarrinho:Carrinho;
    // @ManyToOne(type => Carrinho, carrinho => carrinho.codProduto)
    // codCarrinho: Carrinho;

    // @ManyToOne(() => Carrinho, (carrinho: Carrinho) => carrinho.codProduto)
    // public codCarrinho: Carrinho;

    

    @ManyToOne(() => Mercado, { eager: true })
    codMercado: Mercado;

    @ManyToOne(() => Imgs, { eager: true })
    codImg: Imgs;
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