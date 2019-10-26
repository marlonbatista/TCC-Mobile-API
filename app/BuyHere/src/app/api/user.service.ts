import { BaseService } from '../base/base.service';
import { Injectable } from '@angular/core';
import { ServiceService } from './service.service';
import { IResultHTTP } from '../Interface/IResult';
import { environment } from 'src/environments/environment';
import { Subject, Observable } from 'rxjs';
import { UserModel } from '../model/UserModel';

@Injectable({
    providedIn: "root"
})
export class UserService extends BaseService<UserModel>{

    private loginSubject = new Subject<boolean>();

    constructor(public http: ServiceService){
        super('users/create', http)
    }

    
}