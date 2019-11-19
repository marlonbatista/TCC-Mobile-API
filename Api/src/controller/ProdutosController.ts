import { BaseController } from "./BaseController";
import { Request } from 'express';
import { Produtos } from "../entity/Produtos";


export class ProdutosController extends BaseController<Produtos> {

    constructor(){
        super(Produtos);
    }

    async save(request: Request){
        let _produtos  = <Produtos>request.body;
        //vamos validar o que está vindo
        super.isRequired(_produtos.name, 'O nome do produto é obrigatório ');
        super.isRequired(_produtos.codigocontrole,'O código para controle é obrigatório');
        //quantidade do produto será legado ao estoque
        // super.isRequired(_produtos.codEstoque,'O codigo do estoque é obrigatória');
        super.isRequired(_produtos.precoNormal,'O preço do produto é obrigatório');
        super.isRequired(_produtos.precoPromocao,'Caso não haja promoção informe o valor de 0,00');
        super.isRequired(_produtos.codMercado, 'O código da Mercado é obrigatório');
        super.isRequired(_produtos.codImg,'O codigo da imagem é obrigatório');
    
       //super.isTrue(isNaN(_produtos.codMercado),'A identidade da loja deve ser um número ');
       //super.isTrue(_produtos.codMercado <= 0, 'O código do mercado deve ser maior que zero');
       
        
        return super.save(_produtos, request);
    }

    async pegaMercado(request: Request) {
        //Mostra os produtos de cada Supermercado
        const id = request.params.id as string;
        return await this.repository.find({
            where: {
                codMercado: id
                
                    // delete:false
            
                
            },
              
            
            
        });
    }

    // async imagemProduto(request:Request){
    //     const id = request.params.id as string;
    //     return await this.repository.find({
    //         where:{
                
    //         }
    //     })
    // }

    
}