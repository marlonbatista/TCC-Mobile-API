import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { IPedidosPendentes } from '../../interfaces/IPedidosPendentes';
import { UserService } from 'src/app/services/user.service';
import { CarrinhoModel } from 'src/app/model/CarrinhoModel';




const DATA_MOCK: IPedidosPendentes[] = [
  { customerName: 'Joao da Silva', date: '01/01/2019' },
  { customerName: 'Joao da Silva', date: '01/01/2019' },
  { customerName: 'Joao da Silva', date: '01/01/2019' },
  { customerName: 'Joao da Silva', date: '01/01/2019' }
];

@Component({
  selector: 'app-pedidos-pendentes',
  templateUrl: './pedidos-pendentes.component.html',
  styleUrls: ['./pedidos-pendentes.component.scss']
})
export class PedidosPendentesComponent implements OnInit {
  columns: string[] = ['Pedido', 'Data','Finalizar'];
  carrinho:CarrinhoModel = new CarrinhoModel();
  dataSource: MatTableDataSource<CarrinhoModel> 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private usersvc:UserService) { 
    
  }

  ngOnInit() { 
    this.bind()
  }

  async bind(){
    const user = JSON.parse(localStorage.getItem('getmestres:mercado'))
    try {
      const result = await this.usersvc.pegaPedido(user.id)
      if(result.success){
        this.carrinho = result.data
        console.log(result.data)
        result.data.map(e=>{
          
          e.updateAt = e.updateAt.split('-')
          const dat = e.updateAt[2].substr(0,2)+" - "+e.updateAt[2].substr(2);
          const tempo = e.updateAt[2].substr(3,8)
          console.log('tempo',tempo)
          console.log('Teste', dat)
          console.log('com date[0]',dat[0]+dat[1] +'/'+e.updateAt[1]+'/'+e.updateAt[0])
          const dia = dat[0]+dat[1] +'/'+e.updateAt[1]+'/'+e.updateAt[0]
          console.log('sem date',e.updateAt)
          e.updateAt = dia +" - "+tempo;
          console.log('agora sim =>',e.updateAt)
        })
        this.dataSource = new MatTableDataSource(result.data);
        this.dataSource.paginator = this.paginator
        
    this.dataSource.paginator = this.paginator;
      }
    } catch (error) {
      console.log('Não deu resultado!',error)
    }
  }
}
