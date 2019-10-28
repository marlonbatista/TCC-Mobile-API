import { CustomerModel } from './../model/customerModel';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { ServiceService } from './service.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseService<CustomerModel> {

  constructor(public http: ServiceService) {
    super('customer', http);
  }

}