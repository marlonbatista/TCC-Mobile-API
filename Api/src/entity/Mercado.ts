import { Entity, Column } from "typeorm";
import { BaseEntity } from "./BaseEntity";


@Entity()
export class Mercado extends BaseEntity{

    @Column({ type: 'varchar', length:200})
    name:string;

    @Column({ type: 'varchar', length:999999999}) //nullable => pode ser nulo
    photo:string

    @Column({type:'varchar', length:200})
    email:string;

    @Column({type:'varchar', length:200})
    password:string;

    @Column({type:"varchar", length:8000, nullable:true})
    description:string;

    @Column({ type: 'varchar', length:1000})
    RazaoSocial:string

    @Column({ type: 'varchar', length:50})
    cnpj:string


    @Column({ type:'varchar', length:100, nullable:true})
    address:string;
    
    @Column({ type:'varchar', length:100, nullable:true})
    addressComplement:string;

    @Column({ type:'varchar', length:2, nullable:true})
    state:string;

    @Column({ type:'varchar', length:100, nullable:true})
    city:string;
    
    @Column({ type: 'varchar', length:20})
    zipCode:string;

    @Column({ type:'varchar', length:8000})
    citiesCare:string;

    @Column({ type:'varchar', length:50})
    phone:string;

    @Column({default:false})
    isRoot:boolean;
    
    @Column({ type: 'varchar', length:900 , nullable:true}) // o campo pode ser nulo
    codprocontrole:string

    
}


/*create table mercado(
codmer integer auto_increment not  null primary key,
razaosocial varchar(30) not null,
cnpj varchar(18) not null,
cep integer not null,
codprocontrole integer not null,
imagem longblob NOT NULL
);*/