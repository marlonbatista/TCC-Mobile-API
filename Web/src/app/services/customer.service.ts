import { BaseService } from '../base/base.service';
import { CustomerModel } from './../model/customerModel';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseService<CustomerModel> {

  constructor(public http: HttpService) {
    super('users', http);
  }
}
