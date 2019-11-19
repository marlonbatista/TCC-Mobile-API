import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { IPedidosPendentes } from '../../interfaces/IPedidosPendentes';
import { UserService } from 'src/app/services/user.service';
import { CarrinhoModel } from 'src/app/model/CarrinhoModel';
import { CompraFinalService } from 'src/app/services/compraFinal.service';
import { CompraFinalModel } from 'src/app/model/CompraFinalModel';
import { Constants } from 'src/app/shared/constants';
import Swal from 'sweetalert2';




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
  carrinho:CompraFinalModel = new CompraFinalModel();
  dataSource: MatTableDataSource<CarrinhoModel> 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private usersvc:UserService, 
    private compraFinal:CompraFinalService) { 
    
  }

  ngOnInit() { 
    this.bind()
  }

  async bind(){
    const user = JSON.parse(localStorage.getItem('getmestres:mercado'))
    try {
      const result = await this.compraFinal.pegaPedido(user.id)
      if(result.success){
        this.carrinho = result.data
        console.log('Resultado',result.data)
        result.data.map(e=>{
          
          e.Compra_Final_updateAt = e.Compra_Final_updateAt.split('-')
          const dat = e.Compra_Final_updateAt[2].substr(0,2)+" - "+e.Compra_Final_updateAt[2].substr(2);
          const tempo = e.Compra_Final_updateAt[2].substr(3,8)
          console.log('tempo',tempo)
          console.log('Teste', dat)
          console.log('com date[0]',dat[0]+dat[1] +'/'+e.Compra_Final_updateAt[1]+'/'+e.Compra_Final_updateAt[0])
          const dia = dat[0]+dat[1] +'/'+e.Compra_Final_updateAt[1]+'/'+e.Compra_Final_updateAt[0]
          console.log('sem date',e.Compra_Final_updateAt)
          e.Compra_Final_updateAt = dia +" - "+tempo;
          console.log('agora sim =>',e.Compra_Final_updateAt)
        })
        this.dataSource = new MatTableDataSource(result.data);
        this.dataSource.paginator = this.paginator
        
    this.dataSource.paginator = this.paginator;
      }
    } catch (error) {
      console.log('Não deu resultado!',error)
    }
  }
  async delete(id:string): Promise<void> {
    console.log( 'O que passou no Delete',id)
    const options: any = { ...Constants.confirm_swal_options, text: `Deseja realmente finalizar essa compra? ${id}` };
    const { value } = await Swal.fire(options);
    if (value) {
      const resul = await this.compraFinal.delete(id);
      if (resul.success) {
        this.bind();
      }
    }
  }
}
