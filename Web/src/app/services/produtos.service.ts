import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { IProdutos } from '../interfaces/IProdutos';
import { IResultHttp } from '../interfaces/IResultHttp';
import { environment } from 'src/environments/environment';

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
