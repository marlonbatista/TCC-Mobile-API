import { Component, OnInit } from '@angular/core';
import { CompraFinalService } from 'src/app/services/compraFinal.service';


@Component({
  selector: 'app-cards-dashboard',
  templateUrl: './cards-dashboard.component.html',
  styleUrls: ['./cards-dashboard.component.scss']
})

export class CardsDashboardComponent implements OnInit {
  pedidos:any;
  

  constructor(
    private compraFinal:CompraFinalService,
    
    ) {
    
    
   }

  ngOnInit() {
    this.bind()
  }

  async bind(){
    const user = JSON.parse(localStorage.getItem('getmestres:mercado'))
    console.log(user)
    try{
      const result = await this.compraFinal.pegaPedido(user.id)
      this.pedidos = result.data.length;
    }
    catch(error){
      alert('Infelizmente Ocorreu um erro, tente novamente')
      console.log(error);
    }
  }

}
