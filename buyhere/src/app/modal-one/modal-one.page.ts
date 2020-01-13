import { Component, OnInit } from '@angular/core';
import { CompraFinalModel } from '../model/CompraFinalModel';
import { CompraFinalService } from '../api/compraFinal.service';
import { MercadoModel } from '../model/Mercado';
import { MercadoService } from '../api/Mercado.service';
import { ModalController } from '@ionic/angular';
import { ModaltwoComponent } from '../modaltwo/modaltwo.component';

@Component({
  selector: 'app-modal-one',
  templateUrl: './modal-one.page.html',
  styleUrls: ['./modal-one.page.scss'],
})
export class ModalOnePage implements OnInit {

  user = JSON.parse(localStorage.getItem('getmestres:user'))
  sacolas: CompraFinalModel = new CompraFinalModel();
  Marketing: MercadoModel = new MercadoModel();
  recebe: any = []
  caixa = ''

  constructor(
    private modalControler: ModalController,
    private CF: CompraFinalService,
    private Mercado: MercadoService) { }

  ngOnInit() {
    this.bind()
  }

  async bind() {
    try {
      const compras = await this.CF.pegaCompra(this.user.id)
      console.log('Compras =>',compras)
      if (compras.success) {
        this.sacolas.id = compras.data.map(e => {
          return e.CompraFinal_id
        })
        this.recebe= compras.data.map(f => {
          return f.Mercado_name
        })
      }
    } catch (error) {
      console.log(error);
    }
  }

  async presentModal(value) {
    const modal = await this.modalControler.create({
      component: ModaltwoComponent,
      componentProps:{
        id_carrinho : value
      }
    });
    return await modal.present();
  }

  close() {
    this.modalControler.dismiss();
  }
}
