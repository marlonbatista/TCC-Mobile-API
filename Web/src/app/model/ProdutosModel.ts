import { BaseModel } from './baseModel';

export class ProdutosModel extends BaseModel {
  name: String;
  codigocontrole: Number;
  precoPromocao: any;
  precoNormal: any;
  estoque:Number;
  quantidade:any;
  codMercado:String;
  codImg:String;
  codCarrinho:any;
}