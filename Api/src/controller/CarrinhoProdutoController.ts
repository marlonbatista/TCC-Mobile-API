import { BaseController } from "./BaseController";
import { CarrinhoController } from "./ShoppingCartController";
import { Request } from 'express';

import { CartStatus } from "../entity/Enum/CartShoppingStatus";
import { Carrinho_Cod_Produto_Produtos } from "../entity/carrinho_cod_produto_produtos";
import { createQueryBuilder, getRepository } from "typeorm";
import { Carrinho } from "../entity/ShoppingCart";
import { Produtos } from "../entity/Produtos";

export class CarrinhoProdutoController extends BaseController<Carrinho_Cod_Produto_Produtos> {

    constructor( private cart:CarrinhoController){
        super(Carrinho_Cod_Produto_Produtos, false);
    }

  

    async save(request: Request){

        let _carrinhoProd  = <Carrinho_Cod_Produto_Produtos>request.body;
        super.isRequired(_carrinhoProd.nameProduto, 'O nome do produto deve ser informado');
        super.isRequired(_carrinhoProd.postCarrinho, 'O código do carrinho deve ser informado');
        super.isRequired(_carrinhoProd.postProdutos, 'O código do produto deve ser informado');
        super.isRequired(_carrinhoProd.quantidade, 'A quantidade deve ser informado');
     
        // const cat =  await this.cart.verifica(_carrinhoProd.postCarrinho);
        // console.log('CAT =>',cat)
        // if((Number(_carrinhoProd.postCarrinho) == catdata.id) && carrinho.compraFinalizada===true)
        // {   
            
        //     let car:Carrinho = new Carrinho();
            
        //     return { status: 400, message: 'Um novo carrinho deve ser criado!' };
        // }
        if(!_carrinhoProd.order)
            _carrinhoProd.order = CartStatus.Pending;
        
        return super.save(_carrinhoProd, request);
    }   
    async pegaProduto(request:Request){
        const id = request.params.id as string;
        const teste:any = await getRepository(Carrinho_Cod_Produto_Produtos) 
           .createQueryBuilder("Carrinho_Cod_Produto_Produtos",)
           .innerJoinAndSelect('Carrinho_Cod_Produto_Produtos.postProdutos', 'produtos')
           .where('Carrinho_Cod_Produto_Produtos.postCarrinho = :id', {id :id} )
           .getMany();

            return teste;
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
        const id = request.params.id as string;
    }
}