import { BaseController } from "./BaseController";
import { Request } from 'express';
import { Carrinho } from "../entity/ShoppingCart";
import { CartStatus } from "../entity/Enum/CartShoppingStatus";

export class CarrinhoController extends BaseController<Carrinho> {

    constructor(){
        super(Carrinho, false);
    }

    // async all(request:Request){

    //     let { carrinhoID } = request.params;
    //     if(!carrinhoID)
    //     return{

    //     }
    //     this.repository.find({

    //         carrinho:
    //     })
    // }

    async save(request: Request){

        let _carrinho  = <Carrinho>request.body;
        
        //vamos validar o que está vindo
        
        
        super.isRequired(_carrinho.codProduto,'O código do produto é obrigatório');
     
        super.isRequired(_carrinho.codUser, 'O código do usuário deve ser informado');

        super.isRequired(_carrinho.nameProduto, 'O nome do produto deve ser informada');

        super.isRequired(_carrinho.precoProduto, 'O preço dos produtos devem ser informados');

        super.isRequired(_carrinho.quantidade, 'A quantidade deve ser informada');

        super.isRequired(_carrinho.valorTotal, 'A preço deve ser informada');

        if(!_carrinho.statusOrder)
            _carrinho.statusOrder = CartStatus.Pending;
        
        return super.save(_carrinho, request);
    }
}