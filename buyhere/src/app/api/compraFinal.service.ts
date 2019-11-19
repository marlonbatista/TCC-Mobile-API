import {  Injectable } from '@angular/core';
import { ServiceService } from './service.service';
import { BaseService } from '../base/base.service';
import { CompraFinalModel } from '../model/CompraFinalModel';
import { IResultHTTP } from '../Interface/IResult';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })
  
export class CompraFinalService extends BaseService<CompraFinalModel> {
    constructor(public http: ServiceService) {
        super('CompraFinalizada', http)
    }


    pegaCompra(id:string):Promise<IResultHTTP>{
        return this.http.get(`${environment.url_api}/CompraFinalizada/user/${id}`)
    }

    pegaCarrinho(id:string):Promise<IResultHTTP>{
        return this.http.get(`${environment.url_api}/CompraFinalizada/produtos/${id}`)
    }

}