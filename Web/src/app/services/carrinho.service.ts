import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';

import { CarrinhoModel } from '../model/CarrinhoModel';

import { environment } from 'src/environments/environment';
import { IResultHttp } from '../interfaces/IResultHttp';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService extends BaseService<CarrinhoModel> {

  
  constructor(public http: HttpService) {
    super('carrinho', http);
  }
  
  
  veri(codUser:string):Promise<IResultHttp>{
    return this.http.get(`${environment.url_api}/carrinho/verifica/${codUser}`)
  }

  pegaProd(id:string):Promise<IResultHttp>{
    return this.http.get(`${environment.url_api}/pegaCarrinho_Cod_Produto_Produtos/teste/${id}`)
  }

}