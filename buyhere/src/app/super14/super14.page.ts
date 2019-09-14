import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { reject } from 'q';
import { ProdutosService } from '../api/produtos.service';
import { getCurrentDebugContext } from '@angular/core/src/view/services';
import { ProdutosModel } from '../model/ProdutosModel';
import { IResultHTTP } from '../Interface/IResult';
import { ServiceService } from '../api/service.service';

@Component({
  selector: 'app-super14',
  templateUrl: './super14.page.html',
  styleUrls: ['./super14.page.scss'],
})
export class Super14Page implements OnInit {

  private baseURL : string = 'http://localhost:3000/api/';
  
  botao : boolean = false;
  botao1:boolean=false;
  botao2:boolean=false;
  valor1:Number;
  preco:DoubleRange;
  AlertController: any;
  public produtos:string[];
  model:ProdutosModel;
  
  

  constructor(private AlertCtrl : AlertController, public http:HttpClient, private produtosService:ProdutosService) {
    this.produtos = [];
   }

  
   async ngOnInit() {
      const prod = await this.produtosService.GetById('1');
      console.log('x',prod);
      this.produtos = prod.data.map((it:ProdutosModel)=>{
        return {name: it.name, id:it.id,preco:it.precoNormal}
      })
      // const prod = await this.produtosService.GetAll();
      // this.produtos = new ProdutosModel(prod.data);
    }

    // filter(value:string){
    //   this.produtos.filter = value.trim().toLowerCase();
    // }
    
    
  async Alert(){
    let alert = await this.AlertCtrl.create({
      header: 'Adicionar ao carrinho',
      message:'Finalizar a <b>compra</b> nesta loja?',
      buttons:[
        {
          text:'Cancelar',
          role:'cancel',
          cssClass:'danger',
          handler: ()=>{
            console.log('Pedido Cancelado')
          }
        },
        {
          text:'Pagar',
          cssClass:'warning',
          handler: ()=>{
            console.log('Pago com Sucesso!')
            
          }
        }]
    });

    await alert.present();
  }
 

  

  teste(){
    if(this.botao==true){
      console.log("verdade");
        
      
    }else{
      console.log("mentira");
    }
  }
  

}

