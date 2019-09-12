import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LojasPage } from './lojas.page';
var routes = [
    {
        path: '',
        component: LojasPage
    }
];
var LojasPageModule = /** @class */ (function () {
    function LojasPageModule() {
    }
    LojasPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [LojasPage]
        })
    ], LojasPageModule);
    return LojasPageModule;
}());
export { LojasPageModule };
//# sourceMappingURL=lojas.module.js.map