import { Component, OnInit } from '@angular/core';
import { isNgTemplate } from '@angular/compiler';
import { NavController, AlertController } from '@ionic/angular';
import { renderTemplate } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-savegnago',
  templateUrl: './savegnago.page.html',
  styleUrls: ['./savegnago.page.scss'],
})

export class SavegnagoPage implements OnInit {

  public itens: any = [];

  constructor(public AlertCtrl: AlertController, public NavController: NavController) {

    this.itens = [
      {
        nome: "Coca-Cola 2L",
        img: "../assets/Coca2lt.jpg",
        preco: 4,
        tipo: "0",
        id_botao: "1",
        qtd: 0,
      },
      {
        nome: "Fanta 2L",
        img: '../assets/fanta.jpg',
        preco: 4,
        tipo: "1",
        id_botao: "2",
        qtd: 0,
      },
      {
        nome: "Fant.G 2L",
        img: "../assets/guarana.jpg",
        preco: 4,
        tipo: "2",
        id_botao: "3",
        qtd: 0,
      },
      {
        nome: "Sprite 2L",
        img: "../assets/sprite.jpg",
        preco: 4,
        tipo: "3",
        id_botao: "4",
        qtd: 0,

      },
      {
        nome: "Pepsi 2L",
        img: "../assets/pepsi.jpg",
        preco: 4,
        tipo: "4",
        id_botao: "5",
        qtd: 0,
      }
    ]
  }

  ngOnInit() { }

  async Alert2() {
    let alert = await this.AlertCtrl.create({
      header: 'Adicionar ao carrinho',
      message: 'Finalizar a <b>compra</b> nesta loja?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
            console.log('Pedido Cancelado')
          }
        },
        {
          text: 'Pagar',
          cssClass: 'warning',
          handler: () => {
            console.log('Pago com Sucesso!')
            var arm = []
            let somaTudo = 0
            for (let j = 0; j < this.itens.length; j++) {
              arm[j] = this.itens[j].qtd * this.itens[j].preco;
              somaTudo += arm[j]
            }
          }
        }]
    });

    await alert.present();
  }
}













