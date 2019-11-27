import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { CompraFinalModel } from '../model/CompraFinalModel';
import { IResultHttp } from '../interfaces/IResultHttp';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CompraFinalService extends BaseService<CompraFinalModel>{

    constructor(public http: HttpService) {
        super('CompraFinalizada', http);

    }

    pegaPedido(id: string): Promise<IResultHttp> {
        return this.http.get(`${environment.url_api}/CompraFinalizada/${id}`);

    }

    contaUserMercado(id:string):Promise<IResultHttp>{
        return this.http.get(`${environment.url_api}/CompraFinalizada/clientes/${id}`)
    }
}