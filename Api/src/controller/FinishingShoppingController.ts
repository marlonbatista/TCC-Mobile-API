import { BaseController } from "./BaseController";
import { CompraFinal } from "./../entity/CompraFinal";
import { Carrinho } from "../entity/ShoppingCart";
import { Request } from  "express";
import { getRepository } from "typeorm";
import { Mercado } from "../entity/Mercado";


export class CompraFinalizadaController extends BaseController<CompraFinal>{

    // cart = new Carrinho();
    constructor(){
        super(CompraFinal)
    }

    async save(request:Request){
        
        let _compra = <CompraFinal>request.body;

        super.isRequired(_compra.carrinho, 'O Id do carrinho é Obrigatório');
        super.isRequired(_compra.mercado, 'O código do mercado é Obrigatório');
        super.isRequired(_compra.user, 'O código do Cliente é Obrigatório');

        return super.save(_compra, request);
        
    }
    
    async pagaConta(request:Request){
        // Aqui eu busco o Id do carrinho que está marcado como compra finalizada pelo cliente
        //porém ainda não foi entregue 
        const id = request.params.id as string;
        const result:any = await getRepository(CompraFinal)
        .createQueryBuilder('Compra_Final')
        .addSelect("carrinho.id")
        .addSelect("carrinho.codUser")
        .innerJoin("Compra_Final.carrinho", "carrinho")
        .innerJoin("Compra_Final.mercado",'Mercado')
        // .innerJoin(Mercado,'mercado','Compra_Final.mercado = mercado.id',)
        .where('carrinho.compraFinalizada = true')
        .andWhere('carrinho.delete = false')
        .andWhere('Compra_Final.delete = false')
        .andWhere('Compra_Final.mercado = :id',{ id: id})
        .getRawMany();

        return result;
        
    }

    async pegaCompra(request:Request){
        const id = request.params.id as string;
        const result:any = await getRepository(CompraFinal)
        .createQueryBuilder('CompraFinal')
        .select("CompraFinal.id")
        .addSelect("Mercado.name")
        .innerJoin("CompraFinal.mercado",'Mercado')
        .where("CompraFinal.user = :id", { id: id})
        .andWhere("CompraFinal.delete = false")
        .getRawMany();

        return result;
    }

    async clienteMercado(request:Request){
        const id = request.params.id as string;
        const result:any = await getRepository(CompraFinal)
        .createQueryBuilder('CompraFinal')
        .select("CompraFinal.*")
        // .select("SUM(location.something)", "sum")
        // .addSelect("COUNT(CompraFinal.user) where CompraFinal.user != CompraFinal.user)","count")
        .innerJoin("CompraFinal.mercado","Mercado")
        .where("CompraFinal.mercado = :id", { id: id})
        .andWhere("CompraFinal.delete = false")
        .getRawMany();

        return result;
    }

    async pegaCarrinhoProdutos(request:Request){
        const id = request.params.id as string;
        const result:any = await getRepository(CompraFinal)
        .createQueryBuilder('CompraFinal')
        .select("carrinho")
        .innerJoin("CompraFinal.carrinho",'carrinho')
        .where("CompraFinal.id = :id", { id: id})
        .andWhere("CompraFinal.delete = false")
        .getRawOne();

        return result;
    }
    

}
