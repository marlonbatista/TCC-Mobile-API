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
import { CarrinhoProdutoModel } from '../model/CarrinhoProdutoModel';
import { UserService } from '../api/user.service';
import { stringify } from '@angular/compiler/src/util';

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
  model: CarrinhoModel[];
  carrinhos: CarrinhoModel = new CarrinhoModel();
  Carrinhoproduto: CarrinhoProdutoModel = new CarrinhoProdutoModel();
  sexta: CarrinhoProdutoModel[];
  armazena: any = [];



  constructor(private AlertCtrl: AlertController,
    public http: HttpClient,
    private produtosService: ProdutosService,
    private active: ActivatedRoute,
    private carrinhoServi: CarrinhoService,
    private enviaCarrinhoService: EnviaCarrinhoService,
    private toastController: ToastController,
    private router: Router,
    private user: UserService,
  ) {
    this.produtos = [];

    this.model = [];
    this.sexta = [];
  }


  async ngOnInit() {
    const prod = await this.produtosService.GetById('1');
    console.log('x', prod);
    // const cart = await this.carrinhoServi.GetAll();
    // this.model = cart.data.map((it:CarrinhoModel)=>{
    //   return { id: it.id};
    // })
    this.produtos = prod.data.map((it: ProdutosModel) => {
      return { name: it.name, id: it.id, precoNormal: it.precoNormal, codImg: it.codImg }
    })
    console.log('User =>', this.user.isStaticLogged)
    console.log('User 2 =>', localStorage.getItem('getmestres:user'))
    let t = JSON.parse(localStorage.getItem('getmestres:user'));
    console.log(t.id);


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

  async save(): Promise<void> {
    let t = JSON.parse(localStorage.getItem('getmestres:user'));
    console.log(t.id)
    const carrinho = await this.carrinhoServi.veri(t.id)
    if (carrinho.success) {
      console.log('passei daqui ooo')

      console.log(carrinho.data)
      console.log('carrinho =>', carrinho.data[0].id)
      for (let h = 0; h < this.produtos.length; h++) {
        console.log(this.armazena)

        console.log('carrinhoproduto =>', this.Carrinhoproduto.quantidade)
        if (this.armazena[h] > "0") {
          console.log('passei aqui', this.produtos[h].name)

          // this.sexta[h].codUser = 1;
          this.Carrinhoproduto.nameProduto = this.produtos[h].name;
          this.Carrinhoproduto.postCarrinho = carrinho.data[0].id;
          this.Carrinhoproduto.postProdutos = this.produtos[h].id;
          this.Carrinhoproduto.quantidade = this.armazena[h];
          // this.sexta[i].quantidade = this.sexta[i].quantidade[i];

          console.log('carrinho', this.Carrinhoproduto.postCarrinho)
          console.log('produto', this.Carrinhoproduto.postProdutos)
          console.log('quantidade', this.Carrinhoproduto)
          const result = await this.enviaCarrinhoService.post(this.Carrinhoproduto);
          // const tenta = await this.carrinhoServi.post(this.carrinhos);
          if (result.success) {
            const toast = await this.toastController.create({
              message: 'Produto savo com Sucesso.',
              duration: 3000
            });
            toast.present();
          }
          console.log(result);


        }
      }
    }


    this.router.navigateByUrl('/carrinho');

  }


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
            this.save();
            console.log('Enviado para carrinho')
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

