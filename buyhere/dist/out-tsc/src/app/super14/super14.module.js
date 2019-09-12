import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Super14Page } from './super14.page';
var routes = [
    {
        path: '',
        component: Super14Page
    }
];
var Super14PageModule = /** @class */ (function () {
    function Super14PageModule() {
    }
    Super14PageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [Super14Page]
        })
    ], Super14PageModule);
    return Super14PageModule;
}());
export { Super14PageModule };
//# sourceMappingURL=super14.module.js.map