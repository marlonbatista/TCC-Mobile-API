import { Component, OnInit } from '@angular/core';
import { CarrinhoProdutoModel } from 'src/app/model/CarrinhoProdutoModel';
import { pegaCarrinhoService } from 'src/app/api/PegaCarrinho.service';
import { EnviaCarrinhoService } from 'src/app/api/enviaCarrinho.service';
import { CarrinhoService } from 'src/app/api/carrinho.service';
import { ToastController, AlertController } from '@ionic/angular';
import { CarrinhoModel } from 'src/app/model/CarrinhoModel';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage implements OnInit {

  carrinhoProduto: CarrinhoProdutoModel[];
    carrinho:CarrinhoModel = new CarrinhoModel();
  constructor(
    private pegacarrinhoService:pegaCarrinhoService,
    private carr:CarrinhoService,
    private toastController: ToastController,
    private AlertCtrl: AlertController
    ) {
    this.carrinhoProduto = [];
       }

 async ngOnInit() {
  //  this.verificaCarrinho();
  
   const user123 =  JSON.parse(localStorage.getItem('getmestres:user'));
    console.log(`Id do usúario ${user123.id}`);
    // const car = await this.pegacarrinhoService.GetById(user123.id);
    const car = await this.carr.veri(user123.id);
    console.log('aqui =', car);
    for(let i=0; i<car.data.length;i++){
      console.log('deu certo '+ i)
      if(car.data[i].compraFinalizada == false){
        //Aqui agora chamo o carrinho com os produtos que ainda não foram finalizados
        console.log("ID do carrinho",car.data[i].id)
        const result = await this.carr.pegaProd(car.data[i].id)
        console.log('reusultado',result)
        
        this.carrinhoProduto = result.data.map((it: CarrinhoProdutoModel) => {
          return { nameProduto: it.nameProduto,
            id: it.id, valorTotal:(it.postProdutos.precoNormal*it.quantidade).toFixed(2),
            // precoNormal: it.precoProduto, 
            quantidade:it.quantidade,
            // valorTotal:it.valorTotal 
          }
          
        })
      }
    }
    
  }

 async AlertConfirmCompra(){
   
 

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
          
          console.log('Compra Finalizada')
        }
      }]
  });

  await alert.present();
}

}
