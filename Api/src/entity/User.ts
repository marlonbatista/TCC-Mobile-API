import { Entity, Column, OneToMany } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Carrinho } from "./ShoppingCart";
import { CompraFinal } from "./CompraFinal";

@Entity() //{ name: 'User'}
export class User extends BaseEntity {



    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'varchar', length: 100 })
    lastname: string;

    @Column({ type: 'varchar', length: 100 })
    city: string;

    @Column({ type: 'varchar', length: 100 })
    phone: string;

    @Column({ type: 'varchar', length: 100 })
    celphone: string;

    @Column({ type: 'varchar', length: 100 })
    cpf: string;

    @Column({ type: 'varchar', length: 100 })
    rg: string;

    @Column({ type: 'date' })
    nasc: Date;

    @Column({ type: 'varchar', length: 100 })
    cardNumber: string;

    @Column({ type: 'varchar', length: 3 })
    SafyNumber: number;

    @Column({ type: 'varchar', length: 10 })
    sex: string;

    @OneToMany(() => Carrinho, carrinho => carrinho.codUser)
    carrinho: Carrinho[];

    @OneToMany(() => CompraFinal, compra => compra.user)
    compra: Carrinho[];

    @Column({ type: 'varchar', length: 200, unique:true })
    email: string;
    
    @Column({ type: 'varchar', length: 200 })
    photo: string

    @Column({ default: false })
    isRoot: boolean;

    @Column({ type: 'varchar', length: 200 })
    password: string;







}
