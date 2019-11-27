import { Component, OnInit } from '@angular/core';
import { CompraFinalService } from 'src/app/services/compraFinal.service';


@Component({
  selector: 'app-cards-dashboard',
  templateUrl: './cards-dashboard.component.html',
  styleUrls: ['./cards-dashboard.component.scss']
})

export class CardsDashboardComponent implements OnInit {
  pedidos: any;
  GuardUser: any = []
  QtoPedidos: Number = 0;
  clienteCadastrado = 0;

  constructor(
    private compraFinal: CompraFinalService,

  ) { }

  ngOnInit() {
    this.bind()
  }

  async bind() {
    const user = this.pegaLoja();
    console.log(user)
    try {
      const result = await this.compraFinal.pegaPedido(user.id)
      this.pedidos = result.data.length;
      this.contaUser()
    }
    catch (error) {
      alert('Infelizmente Ocorreu um erro, tente novamente')
      console.log(error);
    }
  }

  pegaLoja() {
    const user = JSON.parse(localStorage.getItem('getmestres:mercado'))
    return user
  }

  async pegaCompra() {
    const mercado = this.pegaLoja();
    try {
      const result = await this.compraFinal.contaUserMercado(mercado.id)
      return result
    } catch (error) {
      console.log(error)
      alert('Infelizmente ocorreu um erro')
    }
  }

  async contaUser() {
    const recebe = await this.pegaCompra()
    this.QtoPedidos = recebe.data.length
    recebe.data.map(e => {
      this.GuardUser.push(e.userId)
    })

    let qtoUser = Array.from(new Set(this.GuardUser));

    this.clienteCadastrado = qtoUser.length;
    return this.clienteCadastrado;


  }



}
