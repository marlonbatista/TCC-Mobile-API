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
    carrinhoNovo:CarrinhoModel = new CarrinhoModel();
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
  async pagaTudo(){
    const user123 =  JSON.parse(localStorage.getItem('getmestres:user'));
    console.log(`Id do usuário ${user123.id}`);
    // const car = await this.pegacarrinhoService.GetById(user123.id);
    const guard = []
    const car = await this.carr.veri(user123.id);
    car.data.map( (e,i) =>{
      if(e.compraFinalizada===false) {
        guard.push(i)
        this.carrinho.id = car.data[guard[0]].id
        this.carrinho.compraFinalizada = true;
      }
    })
    console.log('Valor que está indo',car.data[guard[0]])
    console.log('Situação do Guard =>',guard)
    console.log('id do carrinho',this.carrinho.id)
    console.log('Compra Finalizada do ID',this.carrinho.compraFinalizada)
    // this.carrinho = car.data;
    this.carrinho.codUser = user123;
    console.log(`this is the codUser => ${this.carrinho}` )
    // this.carrinho.compraFinalizada = true;

    
    try {
      const paga = await this.carr.post(this.carrinho)
      if(paga.success){
        alert('Sua Compra foi finalizada com sucesso! Só um momento, estamos criando outro carrinho para você')
        this.carrinhoNovo.codUser = user123;
        this.carrinhoNovo.compraFinalizada = false ;
        this.carr.post(this.carrinhoNovo)
        location.reload();
        
      }
    } catch (error) {
      alert('Infelizmente ocorreu um erro ao finalizar sua compra')
    }

    
    console.log('Compra Fexo')
    // const confirm = await this.carr.post()
  }
  deslog(){
    // this.isLogged = false;
    localStorage.clear();
    location.reload();
    
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
          this.pagaTudo()
          console.log('Compra Finalizada')
        }
      }]
  });

  await alert.present();
}

}
