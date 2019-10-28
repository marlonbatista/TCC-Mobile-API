import { NavController, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { isNgTemplate } from '@angular/compiler';
import { renderTemplate } from '@angular/core/src/render3/instructions';
// import { testUserAgent } from '@ionic/core';



@Component({
  selector: 'app-savegnago',
  templateUrl: './savegnago.page.html',
  styleUrls: ['./savegnago.page.scss'],
})
export class SavegnagoPage implements OnInit {

  // produtos = [];
  // produto:Produtos  = {
  //    qtd:,


  // };
  public itens: any = [];

  //public teste: any;
  //public teste2:Array<Object>=[];
  
  



  constructor(public AlertCtrl: AlertController, public NavController: NavController) {

    
    
   
    
    //this.teste2=[],
    this.itens = [
      {

        nome: "Coca-Cola 2L",
        img: "../assets/Coca2lt.jpg",
        preco: 4,
        tipo: "0",
        id_botao:"1",
        qtd:0,
        


      },
      {
        nome: "Fanta 2L",
        img: '../assets/fanta.jpg',
        preco: 4,
        tipo: "1",
        id_botao:"2",
        qtd:0,
      },
      {
        nome: "Fant.G 2L",
        img: "../assets/guarana.jpg",
        preco: 4,
        tipo: "2",
        id_botao:"3",
        qtd:0,
      },
      {
        nome: "Sprite 2L",
        img: "../assets/sprite.jpg",
        preco: 4,
        tipo: "3",
        id_botao:"4",
        qtd:0,

      },
      {
        nome: "Pepsi 2L",
        img: "../assets/pepsi.jpg",
        preco: 4,
        tipo: "4",
        id_botao:"5",
        qtd:0,
      }
    ]
    console.log(this.itens.length)
    console.log(this.itens[0].qtd)
    
    
      
      
    
     
     
    
    //this.teste2=[]
  }
  
  ngOnInit() {

  }
  // Botao(){
  //   for (var i = 0; i <= this.itens.length; i++) {
  //     var pai = document.getElementById('quantidade');
  //     var btn = document.createElement("ion-select");
      
  //     btn.setAttribute("id", '"'+[i]+'"');
  //     pai.appendChild(btn);

  //     var opc = document.createElement("ion-select-option");
  //     opc.setAttribute("value", "aquele_testão");
  //     var t = document.createTextNode("aquele textão");
  //     opc.appendChild(t);
  //     document.getElementById('"'+[i]+'"').appendChild(opc);

  //     var opc2 = document.createElement("ion-select-option");
  //     opc2.setAttribute("value",'"'+[i]+'"' );
  //     var t2 = document.createTextNode('"'+[i]+'"');
  //     opc2.appendChild(t2);
  //     var resul = document.getElementById('"'+[i]+'"').appendChild(opc2);

  //   }
  //   console.log(t2)
  // }
  
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
            var arm=[]
            let somaTudo = 0
            for(let j=0;j<this.itens.length;j++){
              
                arm[j] = this.itens[j].qtd * this.itens[j].preco;
              
                somaTudo += arm[j]
            }
            console.log(this.itens[0].qtd * this.itens[0].preco)
            console.log(`Array de cada itens multiplicado pelo valor${arm}`)
            console.log(this.itens[0].qtd)
            console.log(`Valor deste Mercado ! =>R$ ${somaTudo}`)

            //function total(id_botao){
             
            
            //}
            //this.teste2.forEach(total)
            // for(var x=0;x<this.itens.length;x++){
            //   console.log(this.teste2+" Deu certo!")
            //   if(this.teste2[x]!=0){
            //     console.log(this.teste2+" Deu certo!")
            //   }
            //   else{
            //     console.log('Deu ruim')
            //   }
            // }
            
            


          }
        }]
    });

    await alert.present();
  }
  
  // Verifica(){
  //   var armazena= document.getElementsByName("myCheck")[p];
    
  //   for(var p=0;p<this.itens.length;p++){
  //     var armazena= document.getElementsByName("myCheck")[p];
  //     if(armazena[p] ==true){
  //       var x=document.getElementsByName("selecao")[p]
  //       x.style.display="block"
  //     console.log(armazena[p])
  //     }
  //   }
    

  //   }
      
    }
    
      
      

    
  







