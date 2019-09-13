import { BaseModel } from './BaseModel';

export class ProdutosModel extends BaseModel{
    name: string;
    codigocontrole: number;
    precoPromocao: number;
    precoNormal: number;
    estoque:number;
    quantidade:number;
    codMercado:string;
    codImg:string;
}