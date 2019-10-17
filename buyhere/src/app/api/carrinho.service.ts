import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { ServiceService } from './service.service';
import { CarrinhoModel } from '../model/CarrinhoModel';
import { IResultHTTP } from '../Interface/IResult';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService extends BaseService<CarrinhoModel> {

  
  constructor(public http: ServiceService) {
    super('carrinho', http);
  }
  
  
  veri(codUser:string):Promise<IResultHTTP>{
    return this.http.get(`${environment.url_api}/carrinho/verifica/${codUser}`)
  }

  pegaProd(id:string):Promise<IResultHTTP>{
    return this.http.get(`${environment.url_api}/pegaCarrinho_Cod_Produto_Produtos/teste/${id}`)
  }

}