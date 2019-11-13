import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
   user = JSON.parse(localStorage.getItem('getmestres:user'))
  
  constructor(private router:Router, private navCtrl: NavController,  public loadingController: LoadingController){
    
    console.log(this.user)
     
  }

  deslog(){
    // this.isLogged = false;
    localStorage.clear();
    location.reload();
    
  }
  async perfil(){
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();
    this.navCtrl.navigateForward('perfil');
    const { role, data } = await loading.onDidDismiss();
  }

  async lojas(){
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();
    this.navCtrl.navigateForward('lojas');
    const { role, data } = await loading.onDidDismiss();
  }
  async carrinho(){
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();
    this.navCtrl.navigateForward('carrinho');
    const { role, data } = await loading.onDidDismiss();
  }
  async oferta(){
    const loading = await this.loadingController.create({
      message:'Aguarde...',
      duration:1000
    });
    this.navCtrl.navigateForward('slides');
    await loading.onDidDismiss();
  }
}
