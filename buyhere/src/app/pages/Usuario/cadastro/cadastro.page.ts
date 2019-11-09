import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CustomerModel } from '../../../model/CustomerModel';
import { UserService } from 'src/app/api/user.service';
import { UserModel } from 'src/app/model/UserModel';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FileManager } from 'src/app/components/input-file/input-file.component';
// import { ConsoleReporter } from 'jasmine';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  //cria variaveis para receber os dados da página

  userNovo: UserModel = new UserModel();

  constructor(public http: HttpClient, private user: UserService,
    private toastController: ToastController,
    private router: Router) { }

  ngOnInit() {

  }

  async save(): Promise<void> {
    
    const testcpf = await this.TestaCPF(this.userNovo.cpf)
    console.log('verificando', testcpf)
    if (testcpf == true) {
      this.userNovo.cpf = this.userNovo.cpf;
      console.log('deu certo cpf', testcpf, this.userNovo.cpf)
      this.userNovo.photo = "../../../../assets/user.png";
      const result = await this.user.post(this.userNovo);
      if (result.success) {
        const toast = await this.toastController.create({
          message: 'Usuário cadastrado com Sucesso.',
          duration: 3000
        });
        toast.present();
        this.router.navigateByUrl('/login');
      }else {
        
        const toast = await this.toastController.create({
          message: 'Dados incorretos',
          duration: 2000
        });
        toast.present();
      }
      console.log(result);
    } else {
      console.log('deu ruim no cpf', testcpf, this.userNovo.cpf)
      const toast = await this.toastController.create({
        message: 'CPF Inválido!',
        duration: 2000
      });
      toast.present();
    }
 
    // return console.log('para' ,this.userNovo.cpf)

  }

  selectedFile(file: FileManager): void {
    if (file.base64Data) {
      this.userNovo.photo = file.base64Data;
    }
  }

  async TestaCPF(strCPF) {
    let Soma;
    let Resto;
    Soma = 0;
    if (strCPF == "00000000000") {

      
      return false;
    }

    for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;
    return true;
  }




  // public createHeaders(header?:HttpHeaders):HttpHeaders {
  //   if(!header){
  //     header = new HttpHeaders();
  //   }
  //   header = header.append('Content-Type', 'application/json');
  //   header = header.append('Accept', 'application/json');
  //   // const token :string = '';

  //   // if(token){
  //   //   header = header.append('x-token-access', token);
  //   // }
  //   return header;
  // }
  // ngOnInit() {
  // }

  // SendResquest() {
  //   const header = this.createHeaders();

  //   let postData = {
  //     "name": "Customer004",
  //     "email": "customer004@email.com",
  //     "tel": "0000252525"
  //   }

  //   this.http.post("http://localhost:3000/customers", postData, {headers:header})
  //     .subscribe(data => {
  //       console.log(data['_body']);
  //     }, error => {
  //       console.log(error);
  //     });
  // }


}
