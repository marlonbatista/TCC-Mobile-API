import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
var SlidesPage = /** @class */ (function () {
    function SlidesPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    SlidesPage.prototype.ngOnInit = function () {
    };
    SlidesPage.prototype.comecar = function () {
        this.navCtrl.navigateForward('home');
    };
    SlidesPage = tslib_1.__decorate([
        Component({
            selector: 'app-slides',
            templateUrl: './slides.page.html',
            styleUrls: ['./slides.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController])
    ], SlidesPage);
    return SlidesPage;
}());
export { SlidesPage };
//# sourceMappingURL=slides.page.js.map