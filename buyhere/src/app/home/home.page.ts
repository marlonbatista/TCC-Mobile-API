import { Component, OnInit } from '@angular/core';
import { CompraFinalService } from '../api/compraFinal.service';
import { ModalOnePage } from '../modal-one/modal-one.page';
import { NavController, LoadingController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  user = JSON.parse(localStorage.getItem('getmestres:user'))
  Notification = '';
  constructor(private router: Router, private navCtrl: NavController,
    public loadingController: LoadingController,
    private CF: CompraFinalService,
    public modalController: ModalController) {
  }
  ngOnInit() {
    this.bind()
  }

  async bind() {
    const compras = await this.CF.pegaCompra(this.user.id)
    console.log("Resultado das Compras => ",compras)
    this.Notification = compras.data.length;
    console.log(this.Notification)
  }
  deslog() {
    localStorage.clear();
    location.reload();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalOnePage
    });
    return await modal.present();
  }

  async perfil() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();
    this.navCtrl.navigateForward('perfil');
    const { role, data } = await loading.onDidDismiss();
  }

  async lojas() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();
    this.navCtrl.navigateForward('lojas');
    const { role, data } = await loading.onDidDismiss();
  }

  async carrinho() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();
    this.navCtrl.navigateForward('carrinho');
    const { role, data } = await loading.onDidDismiss();
  }
  
  async oferta() {
    const loading = await this.loadingController.create({
      message: 'Aguarde...',
      duration: 1000
    });
    this.navCtrl.navigateForward('slides');
    await loading.onDidDismiss();
  }
}
