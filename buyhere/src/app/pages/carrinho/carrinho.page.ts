import { Component, OnInit } from '@angular/core';
import { CarrinhoProdutoModel } from 'src/app/model/CarrinhoProdutoModel';
import { pegaCarrinhoService } from 'src/app/api/PegaCarrinho.service';
import { EnviaCarrinhoService } from 'src/app/api/enviaCarrinho.service';
import { CarrinhoService } from 'src/app/api/carrinho.service';
import { ToastController } from '@ionic/angular';
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
            id: it.id, valorTotal:(it.postProdutos.precoNormal*it.quantidade),
            // precoNormal: it.precoProduto, 
            quantidade:it.quantidade,
            // valorTotal:it.valorTotal 
          }
          
        })
      }
    }
    
  }

 async verificaCarrinho():Promise<void>{
    const user123 =  JSON.parse(localStorage.getItem('getmestres:user'));
    console.log(user123.id);
    //fazer um get
    // const carrinh =  this.carr(user123.id);
    // this.carrinho.codUser = user123.id;
    // console.log(this.carrinho.codUser);//
    this.carrinho.codUser = user123.id;
    console.log(this.carrinho.codUser);
    this.carrinho.id = '1';
    console.log('this.carrinho =>',this.carrinho.codUser)
    const getId = await this.carr.GetAll()
    const result = await this.carr.post(this.carrinho);
    if(result.success){
    
      const toast = await this.toastController.create({
        message:'Sucesso!',
        duration :2000
      });
      toast.present();
      
      console.log('result',result)
    }

   }

}
