import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CadastroPage } from './cadastro.page';
var routes = [
    {
        path: '',
        component: CadastroPage
    }
];
var CadastroPageModule = /** @class */ (function () {
    function CadastroPageModule() {
    }
    CadastroPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [CadastroPage]
        })
    ], CadastroPageModule);
    return CadastroPageModule;
}());
export { CadastroPageModule };
//# sourceMappingURL=cadastro.module.js.map