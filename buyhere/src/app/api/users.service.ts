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
export class UsersService extends BaseService<UserModel>{

    private loginSubject = new Subject<boolean>();

    constructor(public http: ServiceService){
        super('users', http)
    }

    login(email:string,password:string):Promise<IResultHTTP>{
        return this.http.post(`${environment.url_api}/users/auth`, { email, password});
    }

    configureLogin(o:any):void{
        const { token,user } = o.data;
        console.log('User =o.data = >',o.data)
        //estou salvando localmente que estou logado
        localStorage.setItem('getmestres:token',token)
        localStorage.setItem('getmestres:user',JSON.stringify(user));
        this.loginSubject.next(this.isStaticLogged);
    }

    get isLogged(): Observable<boolean>{
        // ele vai observar o login e escutando a aplicação
        return this.loginSubject.asObservable();
    }

    get isStaticLogged():boolean{
        //se não tiver o token será negado
        //se não não tiver token eu estou negando
        return !!localStorage.getItem('getmestres:token');
    }

    createUser
    static get token():string{
        return localStorage.getItem('getmestres:token')
    }
}