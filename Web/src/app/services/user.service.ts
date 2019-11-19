import { UserModel } from './../model/userModel';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpService } from './http.service';
import { IResultHttp } from '../interfaces/IResultHttp';
import { environment } from './../../environments/environment';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<UserModel> {

  private loginSubject = new Subject<boolean>();

  constructor(public http: HttpService) {
    super('mercado', http);
  }

  login(email: string, password: string): Promise<IResultHttp> {
    return this.http.post(`${environment.url_api}/mercado/auth2`, { email, password });
  }

  configureLogin(o): void {
    const { token, mercado } = o.data;
    localStorage.setItem('getmestres:token', token);
    localStorage.setItem('getmestres:mercado', JSON.stringify(mercado));
    this.loginSubject.next(this.isStaticLogged);
  }

  get isLogged(): Observable<boolean> {
    return this.loginSubject.asObservable();

  }
  get isStaticLogged(): boolean {
    return !!localStorage.getItem('getmestres:token');
  }

  static get token(): string {
    return localStorage.getItem('getmestres:token');
  }

  
}
