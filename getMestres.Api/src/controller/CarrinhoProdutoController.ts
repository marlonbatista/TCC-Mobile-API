import { BaseController } from "./BaseController";
import { Request } from 'express';

import { CartStatus } from "../entity/Enum/CartShoppingStatus";
import { Carrinho_Cod_Produto_Produtos } from "../entity/carrinho_cod_produto_produtos";

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
    async pegaCarrinho2(request: Request) {
        //Mostra os produtos de cada Supermercado
        const id = request.params.id as string;
        return await this.repository.find({
            where: {
                postCarrinhoId: id
            }
        });
    }
}