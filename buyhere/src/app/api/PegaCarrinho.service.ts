import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { ServiceService } from './service.service';
import { CarrinhoProdutoModel } from '../model/CarrinhoProdutoModel';

@Injectable({
  providedIn: 'root'
})
export class pegaCarrinhoService extends BaseService<CarrinhoProdutoModel> {

  constructor(public http: ServiceService) {
    super('Carrinho_Cod_Produto_Produtos/aqui', http);
  }


}