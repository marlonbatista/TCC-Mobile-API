import { BaseController } from "./BaseController";
import { Request } from 'express';

import { CartStatus } from "../entity/Enum/CartShoppingStatus";
import { Carrinho_Cod_Produto_Produtos } from "../entity/carrinho_cod_produto_produtos";
import { createQueryBuilder } from "typeorm";

export class CarrinhoProdutoController extends BaseController<Carrinho_Cod_Produto_Produtos> {

    constructor(){
        super(Carrinho_Cod_Produto_Produtos, false);
    }

  

    async save(request: Request){

        let _carrinhoProd  = <Carrinho_Cod_Produto_Produtos>request.body;
        
    
     
        super.isRequired(_carrinhoProd.nameProduto, 'O nome do produto deve ser informado');
        super.isRequired(_carrinhoProd.postCarrinho, 'O código do carrinho deve ser informado');
        super.isRequired(_carrinhoProd.postProdutos, 'O código do produto deve ser informado');
        super.isRequired(_carrinhoProd.quantidade, 'A quantidade deve ser informado');
     

    
        if(!_carrinhoProd.order)
            _carrinhoProd.order = CartStatus.Pending;
        
        return super.save(_carrinhoProd, request);
    }
    async pegaTudo(request: Request) {
        //Mostra os produtos de cada Supermercado
        const id = request.params.id as string;
        return await this.repository.find({
         where:{
                postCarrinho: id
         }
        });
    }
    async pegaCarrinho(request: Request) {
        //Mostra os produtos de cada Supermercado
        // const id = request.params.id as string;
        // return await this.repository.find({
        //     innerJoin
        //     // where: {
        //     //     codUser: id
        //     // }
        // });
        const id = request.params.id as string;
        // const produto = await getConnection()
        //     .createQueryBuilder()
        //     .select("nameProduto")
        //     .from(carrinho__cod__produto__produtos, "carrinho__cod__produto__produtos")
        //     .innerJoin(carrinho,'carrinho',on 'carrinho.id = carrinho__cod__produto__produtos.postCarrinhoId")
             
        //     .where(", { id: 1 })
        //     .getOne();

    //         const produto = await createQueryBuilder("carrinho__cod__produto__produtos")
    // .innerJoinAndSelect("postCarrinho.carrinho__cod__produto__produtos","carrinho")
    // .where("carrinho.UserId = :id", { id:id})
    // .getOne()
    // console.log('tTESTANDO',produto)
    }
}