import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { CustomerModel } from '../../../model/CustomerModel';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  //cria variaveis para receber os dados da página

  model: CustomerModel = new CustomerModel();

  constructor(public http: HttpClient) { }

  public createHeaders(header?:HttpHeaders):HttpHeaders {
    if(!header){
      header = new HttpHeaders();
    }
    header = header.append('Content-Type', 'application/json');
    header = header.append('Accept', 'application/json');
    // const token :string = '';

    // if(token){
    //   header = header.append('x-token-access', token);
    // }
    return header;
  }
  ngOnInit() {
  }

  SendResquest() {
    const header = this.createHeaders();

    let postData = {
      "name": "Customer004",
      "email": "customer004@email.com",
      "tel": "0000252525"
    }

    this.http.post("http://localhost:3000/customers", postData, {headers:header})
      .subscribe(data => {
        console.log(data['_body']);
      }, error => {
        console.log(error);
      });
  }


}
