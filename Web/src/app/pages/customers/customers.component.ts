import { Component, OnInit, ViewChild } from '@angular/core';
import { CompraFinalService } from 'src/app/services/compraFinal.service';
import { Constants } from '../../shared/constants';
import { CustomerModel } from './../../model/customerModel';
import { CustomerService } from '../../services/customer.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})

export class CustomersComponent implements OnInit {

  columns: string[] = ['Nome', 'E-mail', 'Telefone'];
  dataSource: MatTableDataSource<CustomerModel>;
  GuardUser: any = [];
  Receb:any = [];
  clienteCadastrado = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private customerSrv: CustomerService,
    private CompraFinal: CompraFinalService
  ) {}

  ngOnInit() {
    this.bind();
  }

  async bind() {
    const dat = await this.EncontrUser()
    console.log(dat)
    const questions = await this.customerSrv.GetAll();
    this.dataSource = new MatTableDataSource(dat);
    console.log(questions)
    // this.dataSource = new MatTableDataSource(questions.data);
    this.dataSource.paginator = this.paginator;
  }

  filter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  pegaLoja() {
    const user = JSON.parse(localStorage.getItem('getmestres:mercado'))
    return user
  }

  async pegaCompra() {
    const mercado = this.pegaLoja();
    try {
      const result = await this.CompraFinal.contaUserMercado(mercado.id)
      return result
    } catch (error) {
      console.log(error)
      alert('Infelizmente ocorreu um erro')
    }
  }

  async EncontrUser() {
    const recebe = await this.pegaCompra()
    recebe.data.map(e => {
      this.GuardUser.push(e.userId)
    });
    let y:any = [];
    let qtoUser = Array.from(new Set(this.GuardUser));

    for(let i = 0;i<qtoUser.length;i++){
      y.push(await this.customerSrv.GetById(qtoUser[i].toString()))
    }
    y.map((e,i)=>{
      this.Receb.push(e.data);
    })

    return this.Receb;
  }

  async delete(customer: CustomerModel): Promise<void> {
    const options: any = { ...Constants.confirm_swal_options, text: `Deseja realmente excluir o cliente ${customer.name}` };
    const { value } = await Swal.fire(options);
    if (value) {
      const resul = await this.customerSrv.delete(customer.id);
      if (resul.success) {
        this.bind();
      }
    }
  }
}
