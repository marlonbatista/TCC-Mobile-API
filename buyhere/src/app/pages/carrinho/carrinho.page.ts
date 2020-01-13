import { Component, OnInit } from '@angular/core';
import { CarrinhoProdutoModel } from 'src/app/model/CarrinhoProdutoModel';
import { pegaCarrinhoService } from 'src/app/api/PegaCarrinho.service';
import { EnviaCarrinhoService } from 'src/app/api/enviaCarrinho.service';
import { CarrinhoService } from 'src/app/api/carrinho.service';
import { ToastController, AlertController } from '@ionic/angular';
import { CarrinhoModel } from 'src/app/model/CarrinhoModel';
import { CompraFinalService } from 'src/app/api/compraFinal.service';
import { CompraFinalModel } from 'src/app/model/CompraFinalModel';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage implements OnInit {

  carrinhoProduto: CarrinhoProdutoModel[];
  carrinho: CarrinhoModel = new CarrinhoModel();
  carrinhoNovo: CarrinhoModel = new CarrinhoModel();
  compraFinal: CompraFinalModel = new CompraFinalModel();
  mercadoId: any = [];

  constructor(
    private pegacarrinhoService: pegaCarrinhoService,
    private carr: CarrinhoService,
    private toastController: ToastController,
    private AlertCtrl: AlertController,
    private CF: CompraFinalService
  ) {
    this.carrinhoProduto = [];
  }

  async ngOnInit() {

    const user123 = JSON.parse(localStorage.getItem('getmestres:user'));
    // const car = await this.pegacarrinhoService.GetById(user123.id);
    const car = await this.carr.veri(user123.id);
    for (let i = 0; i < car.data.length; i++) {
      console.log('deu certo ' + i)
      if (car.data[i].compraFinalizada == false) {
        //Aqui agora chamo o carrinho com os produtos que ainda não foram finalizados
        const result = await this.carr.pegaProd(car.data[i].id)
        //Aqui pego o id dos produtos no carrinho
        const prod = result.data.map(e => {

          return e.postProdutos.id
        })
        const o = prod.toString();
        const recebe = [];

        //Aqui busco por todo os produtos que estão no carrinho
        for (let p = 0; p < prod.length; p++) {
          recebe.push(await this.carr.descobreMercado(prod[p]))
        }
        //separo cada produto 
        const t = recebe.map(e => {
          return e.data
        });
        //busco o mercado de cada um
        const po = t.map(e => {
          this.compraFinal.mercado = e.codMercado.id
          return e.codMercado.id
        });

        // aqui pego os produtos e o mercado de cada produto
        this.carrinhoProduto = result.data.map((it: CarrinhoProdutoModel) => {
          return {
            nameProduto: it.nameProduto,
            id: it.id, valorTotal: (it.postProdutos.precoNormal * it.quantidade).toFixed(2),
            // precoNormal: it.precoProduto, 
            quantidade: it.quantidade,
            // valorTotal:it.valorTotal 
          }
        })
      }
    }
  }
  async pagaTudo() {
    const user123 = JSON.parse(localStorage.getItem('getmestres:user'));
    console.log(`Id do usuário ${user123.id}`);
    // const car = await this.pegacarrinhoService.GetById(user123.id);
    const guard = []
    const car = await this.carr.veri(user123.id);
    car.data.map((e, i) => {
      if (e.compraFinalizada === false) {
        guard.push(i)
        this.carrinho.id = car.data[guard[0]].id
        this.carrinho.compraFinalizada = true;
      }
    });
    // this.carrinho = car.data;
    this.carrinho.codUser = user123;
    this.compraFinal.user = this.carrinho.codUser;
    this.compraFinal.carrinho = this.carrinho.id;

    try {
      const finaliza = await this.CF.post(this.compraFinal)
      const paga = await this.carr.post(this.carrinho)
      if (paga.success && finaliza.success) {
        alert(`Sua Compra foi finalizada com sucesso! Só um momento, 
        estamos criando outro carrinho para você`)
        this.carrinhoNovo.codUser = user123;
        this.carrinhoNovo.compraFinalizada = false;
        await this.carr.post(this.carrinhoNovo);
        location.reload();
      }
    } catch (error) {
      alert('Infelizmente ocorreu um erro ao finalizar sua compra');
    }
  }

  deslog() {
    localStorage.clear();
    location.reload();
  }

  async AlertConfirmCompra() {
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
