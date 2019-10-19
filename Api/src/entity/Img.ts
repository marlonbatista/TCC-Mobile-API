import { Entity, Column, ManyToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";



@Entity()
export class Imgs extends BaseEntity{

    @Column({ type:'varchar', length:200 })
    name:string;

    @Column({ type:'varchar' , length:1000, nullable:true})
    description:string;

    @Column({ type:'varchar' , length:3000, nullable:true})
    routeLocation:string;

    

    
}
