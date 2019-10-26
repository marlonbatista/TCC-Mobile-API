import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MercadoService } from 'src/app/api/Mercado.service';
import { MercadoModel } from 'src/app/model/Mercado';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-lojas',
  templateUrl: './lojas.page.html',
  styleUrls: ['./lojas.page.scss'],
})
export class LojasPage implements OnInit {
  
  mercados:any;
  lojas:MercadoModel[];
  stored:MercadoModel = new MercadoModel;
  navigation : NavigationExtras;
  
  constructor(private navCtrl: NavController,
              private mercadoService:MercadoService) { 
                this.mercados = []
                
              }

  ngOnInit() {
    this.getMercado()
  }

  async getMercado(){
    this.mercados = await this.mercadoService.GetAll()
    //  = stores
    console.log(this.mercados.data)
    if(this.mercados.success){
      return this.lojas = this.mercados.data;
      
      console.log('Lojas =>',this.lojas)
    }
  }
  async su14(e) {
    this.stored.id = e
    console.log(this.stored)
    this.navigation = {
      queryParams : {
        Id  : this.stored.id,
        
      }
    }
    this.navCtrl.navigateBack(['super14'], this.navigation);
    // this.navCtrl.navigateForward('super14');
  }
  deslog(){
    // this.isLogged = false;
    localStorage.clear();
    location.reload();
    
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