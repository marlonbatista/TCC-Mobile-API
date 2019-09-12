import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
var Super14Page = /** @class */ (function () {
    function Super14Page(AlertCtrl) {
        this.AlertCtrl = AlertCtrl;
        this.botao = false;
        this.botao1 = false;
        this.botao2 = false;
    }
    Super14Page.prototype.ngOnInit = function () {
    };
    Super14Page.prototype.Alert = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.AlertCtrl.create({
                            header: 'Adicionar ao carrinho',
                            message: 'Finalizar a <b>compra</b> nesta loja?',
                            buttons: [
                                {
                                    text: 'Cancelar',
                                    role: 'cancel',
                                    cssClass: 'danger',
                                    handler: function () {
                                        console.log('Pedido Cancelado');
                                    }
                                },
                                {
                                    text: 'Pagar',
                                    cssClass: 'warning',
                                    handler: function () {
                                        console.log('Pago com Sucesso!');
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Super14Page.prototype.teste = function () {
        if (this.botao == true) {
            console.log("verdade");
        }
        else {
            console.log("mentira");
        }
    };
    Super14Page = tslib_1.__decorate([
        Component({
            selector: 'app-super14',
            templateUrl: './super14.page.html',
            styleUrls: ['./super14.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AlertController])
    ], Super14Page);
    return Super14Page;
}());
export { Super14Page };
//# sourceMappingURL=super14.page.js.map