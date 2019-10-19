import { ProdutosService } from '../../services/produtos.service';
import { Component, OnInit } from '@angular/core';
import { ProdutosModel } from '../../model/ProdutosModel';
// import { IProdutos } from '../../interfaces/IProdutos';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-category',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {

  produtos: ProdutosModel = new ProdutosModel();

  constructor(
    private produtosService: ProdutosService,
    private matSnack: MatSnackBar,
    private router: Router,
    private active: ActivatedRoute
  ) { }

  ngOnInit() {
    this.active.params.subscribe(p => this.getId(p.id));
    const mercado = JSON.parse(localStorage.getItem('getmestres:mercado'))
    console.log('mercado',mercado.id)
  }

  async getId(id: string): Promise<void> {
    if (id === 'new') { return; }
    const result = await this.produtosService.GetById(id);
    this.produtos = result.data as ProdutosModel;
  }

  async save(): Promise<void> {
    
    const mercado = JSON.parse(localStorage.getItem('getmestres:mercado'))
    console.log('mercado',mercado.id)
    this.produtos.codMercado = mercado.id;
    const result = await this.produtosService.post(this.produtos as ProdutosModel);
    if (result.success) {
      this.matSnack.open('Produto salvo com sucesso', undefined, { duration: 3000 });
      this.router.navigateByUrl('/Produtos');
    }
  }

}
