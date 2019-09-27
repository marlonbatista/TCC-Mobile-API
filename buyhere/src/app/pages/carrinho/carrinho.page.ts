import { Component, OnInit } from '@angular/core';
import { CarrinhoProdutoModel } from 'src/app/model/CarrinhoProdutoModel';
import { pegaCarrinhoService } from 'src/app/api/PegaCarrinho.service';
import { EnviaCarrinhoService } from 'src/app/api/enviaCarrinho.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage implements OnInit {

  carrinhoProduto: CarrinhoProdutoModel[];

  constructor(private pegacarrinhoService:EnviaCarrinhoService) {
    this.carrinhoProduto = [];
   }

 async ngOnInit() {
    const car = await this.pegacarrinhoService.GetAll();
    console.log('x', car);
    this.carrinhoProduto = car.data.map((it: CarrinhoProdutoModel) => {
      return { nameProduto: it.nameProduto,
        id: it.id, 
        // precoNormal: it.precoProduto, 
        quantidade:it.quantidade,
        // valorTotal:it.valorTotal 
      }
    })
  }

}
