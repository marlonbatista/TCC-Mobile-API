import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { reject } from 'q';
import { ProdutosService } from '../api/produtos.service';
import { getCurrentDebugContext } from '@angular/core/src/view/services';
import { ProdutosModel } from '../model/ProdutosModel';
import { IResultHTTP } from '../Interface/IResult';
import { ServiceService } from '../api/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CarrinhoModel } from '../model/CarrinhoModel';
import { CarrinhoService } from '../api/carrinho.service';
import { EnviaCarrinhoService } from '../api/enviaCarrinho.service';

@Component({
  selector: 'app-super14',
  templateUrl: './super14.page.html',
  styleUrls: ['./super14.page.scss'],
})
export class Super14Page implements OnInit {

  private baseURL: string = 'http://localhost:3000/api/';

  botao: boolean = false;
  botao1: boolean = false;
  botao2: boolean = false;
  valor1: Number;
  preco: DoubleRange;
  AlertController: any;
  produtos: ProdutosModel[];
  model: ProdutosModel;
  carrinhos: CarrinhoModel = new CarrinhoModel();



  constructor(private AlertCtrl: AlertController,
    public http: HttpClient,
    private produtosService: ProdutosService,
    private active: ActivatedRoute,
    private enviaCarrinhoService:EnviaCarrinhoService,
    private toastController: ToastController,
    private router: Router
  ) {
    this.produtos = [];
    this.carrinhos;
    
  }


  async ngOnInit() {
    const prod = await this.produtosService.GetById('1');
    console.log('x', prod);
    this.produtos = prod.data.map((it: ProdutosModel) => {
      return { name: it.name, id: it.id, precoNormal: it.precoNormal, codImg: it.codImg }
    })
    if(this.carrinhos.quantidade != 0){
      for(let i = 0; i<this.produtos.length;i++){
        this.carrinhos.codUser = 1;
        this.carrinhos.nameProduto = this.produtos[i].name;
        this.carrinhos.codProduto = this. produtos[i].id;
        this.carrinhos.precoProduto = this.produtos[i].precoNormal;
        
      }
      return this.carrinhos;
    }
    // this.active.params.subscribe(p=> this.getProduto(p.id));
    // const prod = await this.produtosService.GetById('1');
    // this.produtos = new ProdutosModel(prod.data);
  }

  
  filterList(evt) {
    console.log("oi");
    const searchTerm = evt.srcElement.value;

    if (!searchTerm) {
      this.ngOnInit();
      return;
    }
    this.produtos = this.produtos.filter(
      termo => {
        if (termo.name && searchTerm) {
          if (termo.name.toLowerCase()
            .indexOf(searchTerm.toLowerCase()) > -1) {
            return true;
          }
          return false;
        }
      }
    );
  }
  async save():Promise<void>{
    const result = await this.enviaCarrinhoService.post(this.carrinhos);
    if(result.success){
      const toast = await this.toastController.create({
        message: 'Produto savo com Sucesso.',
        duration: 3000
      });
      toast.present();
      this.router.navigateByUrl('/carrinho');
    }
    console.log(result);
  }

  // async save(): Promise<void> {
  //   for (let i = 0; i < this.carrinhos.length; i++) {
  //     if (this.carrinhos[i].quantidade != 0) {
  //       console.log('passei aqui')
  //       this.carrinhos[i].codProduto = this.produtos[i].id;
  //       this.carrinhos[i].nameProduto = this.produtos[i].name;
  //       this.carrinhos[i].precoProduto = this.produtos[i].precoNormal;
  //       const result = await this.carrinh.post(this.carrinhos[i]);
  //       if (result.success) {
  //         const toast = await this.toastController.create({
  //           message: 'Itens enviados para o carrinho.',
  //           duration: 3000
  //         });
  //         toast.present();
  //       }
  //       console.log(result);
  //       this.router.navigateByUrl('/carrinho');
  //     }
  //   }

  // }
  async Alert() {
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
            
          }
        }]
    });

    await alert.present();
  }




  teste() {
    if (this.botao == true) {
      console.log("verdade");


    } else {
      console.log("mentira");
    }
  }


}

