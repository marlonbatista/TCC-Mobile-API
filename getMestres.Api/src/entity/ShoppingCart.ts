import { BaseEntity } from "./BaseEntity";
import { Entity, Column, ManyToOne, OneToMany, ManyToMany, JoinTable, OneToOne, JoinColumn } from "typeorm";
import { Mercado } from "./Mercado";
import { Produtos } from "./Produtos";
import { CartStatus } from "./Enum/CartShoppingStatus";
import { User } from "./User";
import { Carrinho_Cod_Produto_Produtos } from "./carrinho_cod_produto_produtos";


@Entity()
export class Carrinho extends BaseEntity {




    // @Column()
    // valorTotal: number;
    @OneToMany((type) => Carrinho_Cod_Produto_Produtos, (postToCarrinho) => postToCarrinho.postCarrinho)
    public Carrinho_Cod_Produto!: Carrinho_Cod_Produto_Produtos[];


    @Column()
    statusOrder: CartStatus;

    // @Column()
    // precoProduto: number;

    @Column("boolean")
    compraFinalizada: boolean = false;

    // @OneToMany(type => Produtos, produtos => produtos.codCarrinho)
    // produtos: Produtos[];

    // @ManyToMany(() => Produtos)
    // @JoinTable()
    // codProduto: Produtos[];


    @ManyToOne(() => User, user => user.carrinho)
    codUser: User;

}

/*codcarrinho integer auto_increment not null primary key,
IDPRODUTO INTEGER NOT NULL,
FOREIGN KEY (IDPRODUTO) REFERENCES PRODUTOS(ID),
codmer integer not null,
nomeProd varchar(50) not null,
quantidade integer not null,
preco double not null,
foreign key (codmer) references mercado (codmer)
);
*/