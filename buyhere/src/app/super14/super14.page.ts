import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ProdutosService } from '../api/produtos.service';
import { ProdutosModel } from '../model/ProdutosModel';
import { ActivatedRoute, Router } from '@angular/router';
import { CarrinhoModel } from '../model/CarrinhoModel';
import { CarrinhoService } from '../api/carrinho.service';
import { EnviaCarrinhoService } from '../api/enviaCarrinho.service';
import { CarrinhoProdutoModel } from '../model/CarrinhoProdutoModel';
import { MercadoService } from '../api/Mercado.service';
import { MercadoModel } from '../model/Mercado';
import { UsersService } from '../api/users.service';

@Component({
  selector: 'app-super14',
  templateUrl: './super14.page.html',
  styleUrls: ['./super14.page.scss'],
})
export class Super14Page implements OnInit {


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
  mercados: MercadoModel[];
  Id: any;


  constructor(private AlertCtrl: AlertController,
    public http: HttpClient,
    private carrinhoServi: CarrinhoService,
    private enviaCarrinhoService: EnviaCarrinhoService,
    private mercadoService: MercadoService,
    private produtosService: ProdutosService,
    private route: ActivatedRoute,
    private router: Router,
    private toastController: ToastController,
    private user: UsersService,
    public loadingController: LoadingController
  ) {
    this.produtos = [];
    this.mercados = [];
    this.model = [];
    this.sexta = [];
    this.route.queryParams.subscribe(parametros => {
      this.Id = parametros["Id"];

    });
  }


  async ngOnInit() {
    const loading = await this.loadingController.create({
      spinner: "crescent",
      duration: 8000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    await loading.present();

    const mercado = await this.mercadoService.GetById(this.Id);
    const prod = await this.produtosService.GetById(mercado.data.id);
    this.mercados = mercado.data;


    this.produtos = prod.data.map((it: ProdutosModel) => {
      return { name: it.name, id: it.id, precoNormal: it.precoNormal, codImg: it.codImg }
    })
    console.log('User =>', this.user.isStaticLogged)
    console.log('User 2 =>', localStorage.getItem('getmestres:user'))
    let t = JSON.parse(localStorage.getItem('getmestres:user'));
    console.log(t.id);

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
  deslog() {
    localStorage.clear();
    location.reload();

  }
  async save(): Promise<void> {
    let user = JSON.parse(localStorage.getItem('getmestres:user'));
    console.log(user.id)
    const carrinho = await this.carrinhoServi.veri(user.id)
    console.log('resultado do carrinho', carrinho)
    if (carrinho.success) {
      //aqui preciso verificar se o array que está vindo da data está retendo algum carrinho que contenha falso
      if (carrinho.data.length != 0) {
        let ids = []
        console.log('cheguei aqui', carrinho.data)
        carrinho.data.map((e, i) => {
          //estou verificando se existe algum carrinho já criado para o cliente
          if (e.compraFinalizada === false) {
            ids.push(i)
            let carrinhoBom = carrinho.data[ids[0]];
            this.Carrinhoproduto.postCarrinho = carrinhoBom.id
          }
          //Caso não exista e todos estejam com a compra finalizada é criado um novo carrinho para o usuário 
          // else{
          //   this.criaCarrinho(user.id)
          // }
        })

        for (let h = 0; h < this.produtos.length; h++) {
          console.log(this.armazena)

          console.log('carrinhoproduto =>', this.Carrinhoproduto.quantidade)
          if (this.armazena[h] > "0") {
            console.log('passei aqui', this.produtos[h].name)

            // this.sexta[h].codUser = 1;
            this.Carrinhoproduto.nameProduto = this.produtos[h].name;

            this.Carrinhoproduto.postProdutos = this.produtos[h].id;
            this.Carrinhoproduto.quantidade = this.armazena[h];
            // this.sexta[i].quantidade = this.sexta[i].quantidade[i];

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
        this.router.navigateByUrl('/carrinho');
      } else {
        console.log('carrinho não existe')
        this.carrinhos.codUser = user.id;
        this.carrinhos.compraFinalizada = false;
        let carId = await this.carrinhoServi.post(this.carrinhos)
        if (carId.success) {
          const toast = await this.toastController.create({
            message: 'Um novo carrinho foi criado para você!.',
            duration: 3000
          });
          toast.present();
          this.Carrinhoproduto.postCarrinho = carId.data.id;
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
      }
    }
  }

  async criaCarrinho(id) {
    localStorage.getItem('getmestres:user')
    this.carrinhos.codUser = id;
    this.carrinhos.compraFinalizada = false;
    let carId = await this.carrinhoServi.post(this.carrinhos)
    if (carId.success) {
      const toast = await this.toastController.create({
        message: 'Um novo carrinho foi criado para você!.',
        duration: 3000
      });
      toast.present();
    }
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

