import { environment } from './../../environments/environment';
import { IResultHTTP } from '../Interface/IResult';
import { ServiceService } from '../api/service.service';

export abstract class BaseService<T> {

  urlBase: string = 'http://localhost:3000/api/';

  constructor(
    public url: string,
    public http:ServiceService) {
    this.urlBase = `${environment.url_api}/${this.url}`;
  }

  public GetAll(): Promise<IResultHTTP> {
    return this.http.get(this.urlBase);
  }

  public GetById(id: string): Promise<IResultHTTP> {
    return this.http.get(`${this.urlBase}/${id}`);
  }

  public post(model: T): Promise<IResultHTTP> {
    return this.http.post(this.urlBase, model);
  }

  public delete(id: string): Promise<IResultHTTP> {
    return this.http.delete(`${this.urlBase}/${id}`);
  }
}