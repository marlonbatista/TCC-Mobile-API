import { Constants } from '../../shared/constants';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { IProdutos } from '../../interfaces/IProdutos';
import { ProdutosService } from '../../services/produtos.service';
import Swal from 'sweetalert2';
import { ProdutosModel } from 'src/app/model/ProdutosModel';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {
  columns: string[] = ['Nome', 'codImg','precoNormal','precoPromocao', 'id'];
  dataSource: MatTableDataSource<IProdutos>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private produtosSrv: ProdutosService) {

  }

  ngOnInit() {
    this.bind();
  }

  async bind() {
    const produtos = await this.produtosSrv.GetAll();
    this.dataSource = new MatTableDataSource(produtos.data);
    this.dataSource.paginator = this.paginator;
  }

  filter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  async delete(produtos: ProdutosModel): Promise<void> {
    const options: any = { ...Constants.confirm_swal_options, text: `Deseja realmente excluir a categoria ${produtos.name}` };
    const { value } = await Swal.fire(options);
    if (value) {
      const resul = await this.produtosSrv.delete(produtos.id);
      if (resul.success) {
        this.bind();
      }
    }
  }

}
