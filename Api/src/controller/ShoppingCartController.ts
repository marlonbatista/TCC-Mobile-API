import { BaseController } from "./BaseController";
import { Request } from 'express';
import { Carrinho } from "../entity/ShoppingCart";
import { CartStatus } from "../entity/Enum/CartShoppingStatus";
import { createQueryBuilder, AdvancedConsoleLogger } from "typeorm";
import { User } from "../entity/User";

export class CarrinhoController extends BaseController<Carrinho> {

    use = new User();
    cart = new Carrinho();
    constructor() {
        super(Carrinho, false);
    }


    async verifica(request: Request) {
        try {
            const veja = request.params.id as string;
            return await this.repository.find({
                where: {
                    codUser: veja
                }
            })
        } catch (errror) {
            console.log(errror)
        }
    }

    async save(request: Request) {
        if (this.cart.compraFinalizada === false) {
            let _carrinho = <Carrinho>request.body;
            super.isRequired(_carrinho.codUser, 'O código do usuário deve ser informado');

            return super.save(_carrinho, request);
        } else {
            let _carrinho = <Carrinho>request.body;
            if (!_carrinho.statusOrder)
                _carrinho.statusOrder = CartStatus.Pending;

            super.isRequired(_carrinho.codUser, 'O código do usuário deve ser informado');
            return super.save(_carrinho, request);
        }
    }

    async pegaCarrinho(request: Request) {
        //Mostra os produtos de cada Supermercado
        const id = request.params.id as string;
        return await this.repository.find({

            where: {
                postCarrinhoId: id
            }
        });
    //     const produto = await createQueryBuilder("carrinho__cod__produto__produtos")
    //         .innerJoinAndSelect("postCarrinho.carrinho__cod__produto__produtos", "carrinho")
    //         .where("carrinho.UserId = :id", { id: id })
    //         .getOne()
    //     console.log('tTESTANDO', produto)
    }
}