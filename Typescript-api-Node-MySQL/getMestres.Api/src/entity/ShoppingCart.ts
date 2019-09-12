import { BaseEntity } from "./BaseEntity";
import { Entity, Column, ManyToOne, OneToMany, ManyToMany, JoinTable, OneToOne, JoinColumn } from "typeorm";
import { Mercado } from "./Mercado";
import { Produtos } from "./Produtos";
import { CartStatus } from "./Enum/CartShoppingStatus";
import { User } from "./User";


@Entity()
export class Carrinho extends BaseEntity {


    @Column({ type: 'varchar', length: 200 })
    nameProduto: string;

    @Column()
    valorTotal: number;

    @Column()
    quantidade: number;

    @Column()
    statusOrder: CartStatus;

    @Column()
    precoProduto: number;
    
    @Column("boolean")
    compraFinalizada:boolean = false;

    @ManyToMany(() => Produtos)
    @JoinTable()
    codProduto: Produtos[];


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