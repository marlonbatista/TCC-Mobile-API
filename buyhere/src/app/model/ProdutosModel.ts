import { BaseModel } from './BaseModel';

export class ProdutosModel extends BaseModel{
    name: String;
    codigocontrole: Number;
    precoPromocao: Number;
    precoNormal: Number;
    estoque:Number;
    quantidade:Number;
    codMercado:String;
    codImg:String;
}