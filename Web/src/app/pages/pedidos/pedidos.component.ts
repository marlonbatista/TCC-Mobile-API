import { ActivatedRoute } from '@angular/router';
import { CarrinhoModel } from 'src/app/model/CarrinhoModel';
import { CarrinhoProdutoModel } from 'src/app/model/CarrinhoProdutoModel';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {

  columns: string[] = ['Nome do Produto', 'Quantidade', 'Preco_Uni'];
  carrinho: CarrinhoProdutoModel = new CarrinhoProdutoModel();
  dataSource: MatTableDataSource<CarrinhoProdutoModel>

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private usersvc: UserService,
    private carrinhoProduto: CarrinhoService,
    private active: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.active.params.subscribe(p => this.getId(p.id));
  }
  async getId(id: string): Promise<void> {
    if (id === 'new') { return; }
    const result = await this.carrinhoProduto.pegaProd(id);
    this.bind(result.data);
  }

  async bind(result) {
    try {
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;
    }
    catch (error) {
      console.log('Não deu resultado!', error);
    }
  }

}
