import { Component, OnInit } from '@angular/core';
import { CarrinhoModel } from 'src/app/model/CarrinhoModel';
import { CarrinhoService } from 'src/app/api/carrinho.service';
import { EnviaCarrinhoService } from 'src/app/api/enviaCarrinho.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage implements OnInit {

  carrinhos: CarrinhoModel[];

  constructor(private pegacarrinhoService:CarrinhoService) {
    this.carrinhos = [];
   }

 async ngOnInit() {
    const car = await this.pegacarrinhoService.GetById('1');
    console.log('x', car);
    this.carrinhos = car.data.map((it: CarrinhoModel) => {
      return { nameProduto: it.nameProduto, id: it.id, precoNormal: it.precoProduto, quantidade:it.quantidade }
    })
  }

}
