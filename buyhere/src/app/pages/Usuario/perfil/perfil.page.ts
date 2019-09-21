import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/model/UserModel';
import { UserService } from 'src/app/api/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})

export class PerfilPage implements OnInit {

  public users:UserModel[];
  constructor(private userSevice:UserService) {
    this.users = [];

  }

  async ngOnInit() {
    const use = await this.userSevice.GetById('1');
    console.log('user',use);
    this.users = use.data;
    // this.model = result.data as CustomerModel;
    // document.getElementById('dados').style.display = "none";
  }

  mostraDados() {

    let dados = document.getElementById('botao');


    dados.onclick = function () {
    alert('Click just happened');
    }

    // if(dados.checked==true){

    //   dados.style.display="block";
    // }
    // else{
    //   dados.style.display="none";
    // }
  }

}
