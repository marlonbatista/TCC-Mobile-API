import * as tslib_1 from "tslib";
import { NavController, AlertController } from '@ionic/angular';
import { Component } from '@angular/core';
var SavegnagoPage = /** @class */ (function () {
    function SavegnagoPage(AlertCtrl, NavController) {
        this.AlertCtrl = AlertCtrl;
        this.NavController = NavController;
        this.itens = [];
        //public teste: any;
        this.teste2 = [];
        this.itens = [
            {
                "nome": "Coca-Cola 2L",
                "img": "../assets/Coca2lt.jpg",
                preco: 4,
                tipo: "0",
                id_botao: "1"
            },
            {
                "nome": "Fanta 2L",
                "img": '../assets/fanta.jpg',
                preco: 4,
                tipo: "1",
                id_botao: "2"
            },
            {
                "nome": "Fant.G 2L",
                "img": "../assets/guarana.jpg",
                preco: 4,
                tipo: "2",
                id_botao: "3"
            },
            {
                "nome": "Sprite 2L",
                "img": "../assets/sprite.jpg",
                preco: 4,
                tipo: "3",
                id_botao: "4"
            },
            {
                "nome": "Pepsi 2L",
                "img": "../assets/pepsi.jpg",
                preco: 4,
                tipo: "4",
                id_botao: "5"
            }
        ];
        for (var j = 0; j < this.itens.length; j++) {
            this.teste2[j] = this.itens[j];
        }
        //this.teste2=[]
    }
    SavegnagoPage.prototype.ngOnInit = function () {
    };
    // Botao(){
    //   for (var i = 0; i <= this.itens.length; i++) {
    //     var pai = document.getElementById('quantidade');
    //     var btn = document.createElement("ion-select");
    //     btn.setAttribute("id", '"'+[i]+'"');
    //     pai.appendChild(btn);
    //     var opc = document.createElement("ion-select-option");
    //     opc.setAttribute("value", "aquele_testão");
    //     var t = document.createTextNode("aquele textão");
    //     opc.appendChild(t);
    //     document.getElementById('"'+[i]+'"').appendChild(opc);
    //     var opc2 = document.createElement("ion-select-option");
    //     opc2.setAttribute("value",'"'+[i]+'"' );
    //     var t2 = document.createTextNode('"'+[i]+'"');
    //     opc2.appendChild(t2);
    //     var resul = document.getElementById('"'+[i]+'"').appendChild(opc2);
    //   }
    //   console.log(t2)
    // }
    SavegnagoPage.prototype.Alert2 = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
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
                                        for (var x = 0; x < _this.teste2.length; x++) {
                                            for (var z = 0; z < _this.itens[x]; z++) {
                                                console.log(_this.teste2[x] + '+' + _this.itens[z]);
                                            }
                                        }
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
    SavegnagoPage = tslib_1.__decorate([
        Component({
            selector: 'app-savegnago',
            templateUrl: './savegnago.page.html',
            styleUrls: ['./savegnago.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AlertController, NavController])
    ], SavegnagoPage);
    return SavegnagoPage;
}());
export { SavegnagoPage };
//# sourceMappingURL=savegnago.page.js.map