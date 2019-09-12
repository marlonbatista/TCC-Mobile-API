import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-lojas',
  templateUrl: './lojas.page.html',
  styleUrls: ['./lojas.page.scss'],
})
export class LojasPage implements OnInit {
  

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }
  su14() {
    this.navCtrl.navigateForward('super14');
  }
  suSav() {
    this.navCtrl.navigateForward('savegnago');
  }
  suExt(){
    this.navCtrl.navigateForward('extra');
  }
  suDia(){
    this.navCtrl.navigateForward('dia');
  }
  suWal(){
    this.navCtrl.navigateForward('walmart');
  }
  suTon(){
    this.navCtrl.navigateForward('tonin');
  }
  suVal(){
    this.navCtrl.navigateForward('semprevale');
  }
  suCar(){
    this.navCtrl.navigateForward('carrefour');
  }
 
  

}
