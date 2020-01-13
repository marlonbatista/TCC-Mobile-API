import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, NavController } from '@ionic/angular';
import { UsersService } from 'src/app/api/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form:any = {};

  constructor(
    private userService: UsersService,
    public toastController: ToastController,
    private router: Router,
    private navCtrl: NavController
    ) { }

  ngOnInit() {
    if(this.userService.isStaticLogged){
      //se ele está logado ele não vai mais pra tela de login
      return this.router.navigateByUrl('/home');
    }
  }

  async login():Promise<void> {
    const result = await this.userService.login(this.form.email, this.form.password);
    console.log(result);
    if (result.success) {
      this.userService.configureLogin(result);
      this.router.navigateByUrl('/home');
    }else{
      const toast = await this.toastController.create({
        message: 'E-mail ou senha incorretos.',
        duration: 2000
      });
      toast.present();
    }
  }

  cadastro(){
    this.navCtrl.navigateForward('cadastro');
  }
}
