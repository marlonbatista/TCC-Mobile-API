import { BaseService } from '../base/base.service';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { IProdutos } from '../interfaces/IProdutos';
import { IResultHttp } from '../interfaces/IResultHttp';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService extends BaseService<IProdutos> {

  constructor(public http: HttpService) {
    super('produtos', http);
  }

  pegaProd(id:string):Promise<IResultHttp>{
    return this.http.get(`${environment.url_api}/prodMercado/${id}`)
  }
}
