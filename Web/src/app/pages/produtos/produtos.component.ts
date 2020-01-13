import { Component, OnInit, ViewChild } from '@angular/core';
import { Constants } from '../../shared/constants';
import { HttpClient } from '@angular/common/http';
import { IProdutos } from '../../interfaces/IProdutos';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ProdutosModel } from 'src/app/model/ProdutosModel';
import { ProdutosService } from '../../services/produtos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {
  columns: string[] = ['Nome', 'codImg','precoNormal','precoPromocao', 'estoque','id'];
  dataSource: MatTableDataSource<IProdutos>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private produtosSrv: ProdutosService,
    private http: HttpClient)
    { }

  ngOnInit() {
    this.bind();
  }

  async bind() {
    const mercadoId = JSON.parse(localStorage.getItem('getmestres:mercado'))
    console.log(mercadoId)
    const produtos = await this.produtosSrv.pegaProd(mercadoId.id)
    this.dataSource = new MatTableDataSource(produtos.data);
    this.dataSource.paginator = this.paginator;
  }

  filter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  async delete(produtos: ProdutosModel): Promise<void> {
    const options: any = { ...Constants.confirm_swal_options, text:
      `Deseja realmente excluir esse produto? ${produtos.name}` };
    const { value } = await Swal.fire(options);
    if (value) {
      const resul = await this.produtosSrv.delete(produtos.id);
      if (resul.success) {
        this.bind();
      }
    }
  }
}
