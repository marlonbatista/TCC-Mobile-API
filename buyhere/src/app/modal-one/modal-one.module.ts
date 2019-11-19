import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalOnePage } from './modal-one.page';
import { ModaltwoComponent } from '../modaltwo/modaltwo.component';

const routes: Routes = [
  {
    path: '',
    component: ModalOnePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalOnePage, ModaltwoComponent],
  entryComponents:[ModaltwoComponent],
  exports:[ModalOnePage]
})
export class ModalOnePageModule {}
