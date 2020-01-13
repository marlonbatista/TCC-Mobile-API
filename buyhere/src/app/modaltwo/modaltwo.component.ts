import { Component, OnInit } from '@angular/core';
import { CompraFinalService } from '../api/compraFinal.service';
import { ModalController, NavParams } from '@ionic/angular';
import { pegaCarrinhoService } from '../api/PegaCarrinho.service';
import { ProdutosModel } from '../model/ProdutosModel';

@Component({
  selector: 'app-modaltwo',
  templateUrl: './modaltwo.component.html',
  styleUrls: ['./modaltwo.component.scss'],
})
export class ModaltwoComponent implements OnInit {

  products: ProdutosModel = new ProdutosModel();
  passId = null;
  
  constructor(
    private modalControler: ModalController,
    private navParams: NavParams,
    private Prod: pegaCarrinhoService,
    private CF: CompraFinalService) { }

  async ngOnInit() {
    this.passId = this.navParams.get('id_carrinho')
    const Id = this.passId.toString();
    console.log(Id)
    const idCarrinho = await this.pegaCarrinho(Id)

    console.log(idCarrinho)
    const produtos = await this.pegaProdutos(idCarrinho)
    this.products = produtos.data.map(e => {
      return e;
    })
  }

  async pegaCarrinho(id) {
    const carrinho = await this.CF.pegaCarrinho(id)
    console.log(carrinho)
    return carrinho.data.carrinho_id
  }

  async pegaProdutos(idProduto) {
    const produtos = await this.Prod.GetById(idProduto)
    console.log('Produtos =>', produtos)
    return produtos;
  }

  closeModal() {
    this.modalControler.dismiss();
  }
}
