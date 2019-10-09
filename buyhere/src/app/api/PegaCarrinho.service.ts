import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { ServiceService } from './service.service';
import { CarrinhoProdutoModel } from '../model/CarrinhoProdutoModel';
import { UserService } from './user.service';
import { UserModel } from '../model/UserModel';

@Injectable({
  providedIn: 'root'
})
export class pegaCarrinhoService extends BaseService<CarrinhoProdutoModel> {


  constructor(public http: ServiceService) {
    super('pegaCarrinho_Cod_Produto_Produtos/aqui', http);
  }
  

  


}