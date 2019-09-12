import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CartazPage } from './cartaz.page';
var routes = [
    {
        path: '',
        component: CartazPage
    }
];
var CartazPageModule = /** @class */ (function () {
    function CartazPageModule() {
    }
    CartazPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [CartazPage]
        })
    ], CartazPageModule);
    return CartazPageModule;
}());
export { CartazPageModule };
//# sourceMappingURL=cartaz.module.js.map