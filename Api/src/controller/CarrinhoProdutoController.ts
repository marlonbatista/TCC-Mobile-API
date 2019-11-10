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
        //    .createQueryBuilder("carrinho")
        //    .select('Carrinho_Cod_Produto_Produtos.nameProduto,Carrinho_Cod_Produto_Produtos.quantidade, produtos.precoNormal')
           .innerJoinAndSelect('Carrinho_Cod_Produto_Produtos.postProdutos', 'produtos')
        //    .innerJoin('carrinho.codUserId','user')
        //    .innerJoin('carrinho.id','Carrinho_Cod_Produto_Produtos',)
        //    .innerJoin('Produtos', 'id')
        //    .where('carrinho.codUser = :id',{id:id})
        // .innerJoin(table2, 't2', 't1.id = t2.id' //INNER JOIN table2 t2 ON t1.id = t2.id
           .where('Carrinho_Cod_Produto_Produtos.postCarrinho = :id', {id :id} )
        //    .andWhere('Carrinho_Cod_Produto_Produtos.postProdutosId = produtos.id')
           .getMany();

        //    select  from carrinho inner join carrinho__cod__produto__produtos on carrinho__cod__produto__produtos.postCarrinhoId = carrinho.id inner join Produtos  on carrinho__cod__produto__produtos.postProdutosId = Produtos.id inner join User on carrinho.codUserId = 1;
           console.log(teste)
           
            // const tata = JSON.stringify(teste)

            // return tata;
            return teste;

        //    console.log(teste2)
           
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