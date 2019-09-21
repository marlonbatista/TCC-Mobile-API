import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { ServiceService } from './service.service';
import { CarrinhoModel } from '../model/CarrinhoModel';

@Injectable({
  providedIn: 'root'
})
export class EnviaCarrinhoService extends BaseService<CarrinhoModel> {

  constructor(public http: ServiceService) {
    super('carrinho', http);
  }


}