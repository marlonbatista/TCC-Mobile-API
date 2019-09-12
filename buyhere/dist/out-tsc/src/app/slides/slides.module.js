import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SlidesPage } from './slides.page';
var routes = [
    {
        path: '',
        component: SlidesPage
    }
];
var SlidesPageModule = /** @class */ (function () {
    function SlidesPageModule() {
    }
    SlidesPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [SlidesPage]
        })
    ], SlidesPageModule);
    return SlidesPageModule;
}());
export { SlidesPageModule };
//# sourceMappingURL=slides.module.js.map