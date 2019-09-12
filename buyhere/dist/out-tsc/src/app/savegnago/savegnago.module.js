import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SavegnagoPage } from './savegnago.page';
var routes = [
    {
        path: '',
        component: SavegnagoPage
    }
];
var SavegnagoPageModule = /** @class */ (function () {
    function SavegnagoPageModule() {
    }
    SavegnagoPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [SavegnagoPage]
        })
    ], SavegnagoPageModule);
    return SavegnagoPageModule;
}());
export { SavegnagoPageModule };
//# sourceMappingURL=savegnago.module.js.map