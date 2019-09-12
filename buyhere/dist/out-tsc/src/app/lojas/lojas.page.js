import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
var LojasPage = /** @class */ (function () {
    function LojasPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    LojasPage.prototype.ngOnInit = function () {
    };
    LojasPage.prototype.su14 = function () {
        this.navCtrl.navigateForward('super14');
    };
    LojasPage.prototype.suSav = function () {
        this.navCtrl.navigateForward('savegnago');
    };
    LojasPage.prototype.suExt = function () {
        this.navCtrl.navigateForward('extra');
    };
    LojasPage.prototype.suDia = function () {
        this.navCtrl.navigateForward('dia');
    };
    LojasPage.prototype.suWal = function () {
        this.navCtrl.navigateForward('walmart');
    };
    LojasPage.prototype.suTon = function () {
        this.navCtrl.navigateForward('tonin');
    };
    LojasPage.prototype.suVal = function () {
        this.navCtrl.navigateForward('semprevale');
    };
    LojasPage.prototype.suCar = function () {
        this.navCtrl.navigateForward('carrefour');
    };
    LojasPage = tslib_1.__decorate([
        Component({
            selector: 'app-lojas',
            templateUrl: './lojas.page.html',
            styleUrls: ['./lojas.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController])
    ], LojasPage);
    return LojasPage;
}());
export { LojasPage };
//# sourceMappingURL=lojas.page.js.map