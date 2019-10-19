import { IInterface } from './IInterface';

export interface IProdutos extends IInterface {
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
