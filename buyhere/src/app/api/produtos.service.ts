import { CustomerModel } from './../model/customerModel';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { ProdutosModel } from '../model/ProdutosModel';
import { ServiceService } from './service.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService extends BaseService<any> {

  constructor(public http: ServiceService) {
    super('prodMercado', http);
  } 

  
}



  
  



