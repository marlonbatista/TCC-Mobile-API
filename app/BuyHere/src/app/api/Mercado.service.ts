import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { ServiceService } from './service.service';
import { MercadoModel } from '../model/Mercado';

@Injectable({
  providedIn: 'root'
})
export class MercadoService extends BaseService<MercadoModel> {

  constructor(public http: ServiceService) {
    super('Mercado', http);
  } 

  
}



  
  



