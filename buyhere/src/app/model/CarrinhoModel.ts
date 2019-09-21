import { BaseModel } from './BaseModel';

export class CarrinhoModel extends BaseModel{
    nameProduto: String;
    valorTotal: number;
    quantidade: number;
    statusOrder: any;
    precoProduto: String;
    compraFinalizada:boolean = false;
    codProduto:any;
    codUser: any;
    

}