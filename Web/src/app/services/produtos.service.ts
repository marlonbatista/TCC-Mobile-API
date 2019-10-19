import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { IProdutos } from '../interfaces/IProdutos';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService extends BaseService<IProdutos> {

  constructor(public http: HttpService) {
    super('produtos', http);
  }

}
