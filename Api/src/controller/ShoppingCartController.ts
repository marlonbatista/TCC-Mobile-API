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
            // if(this.cart.compraFinalizada == false){
            let _carrinho = <Carrinho>request.body;
            // super.isRequired(_carrinho.id, 'O Id do carrinho é requirido')
            super.isRequired(_carrinho.codUser, 'O código do usuário deve ser informado');
            console.log('passei no if')
            return super.save(_carrinho, request);
        } else {

            let _carrinho = <Carrinho>request.body;
            // let _carrinho = <Carrinho>request.body;
            if (!_carrinho.statusOrder)
                _carrinho.statusOrder = CartStatus.Pending;

            super.isRequired(_carrinho.codUser, 'O código do usuário deve ser informado');
            console.log('passei no else')
            return super.save(_carrinho, request);
        }
        //vamos validar o que está vindo



    



    }
    async pegaCarrinho(request: Request) {
        //Mostra os produtos de cada Supermercado
        const id = request.params.id as string;
        return await this.repository.find({

            where: {
                postCarrinhoId: id
            }
        });
        // const id = request.params.id as string;
        // const produto = await getConnection()
        //     .createQueryBuilder()
        //     .select("nameProduto")
        //     .from(carrinho__cod__produto__produtos, "carrinho__cod__produto__produtos")
        //     .innerJoin(carrinho,'carrinho',on 'carrinho.id = carrinho__cod__produto__produtos.postCarrinhoId")

        //     .where(", { id: 1 })
        //     .getOne();

        const produto = await createQueryBuilder("carrinho__cod__produto__produtos")
            .innerJoinAndSelect("postCarrinho.carrinho__cod__produto__produtos", "carrinho")
            .where("carrinho.UserId = :id", { id: id })
            .getOne()
        console.log('tTESTANDO', produto)
    }
}