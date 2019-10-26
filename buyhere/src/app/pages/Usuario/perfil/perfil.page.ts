import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/model/UserModel';
import { UsersService } from 'src/app/api/users.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  user:any;
  
  public users:UserModel = new UserModel;
  constructor(private userSevice:UsersService) {
    this.user = [];

  }

  async ngOnInit() {
    const id = JSON.parse(localStorage.getItem('getmestres:user'));
    console.log(id)
    this.user = await this.userSevice.GetById(id.id);
    if(this.user.success){
      
      this.users = this.user.data;
      
    }
    
  }

  mostraDados() {

    let x = document.getElementById('dados')
    
    
    if(x.style.display==="none")
      x.style.display="block";
    else
      x.style.display="none";
    

    // if(dados.checked==true){

    //   dados.style.display="block";
    // }
    // else{
    //   dados.style.display="none";
    // }
  }

}
