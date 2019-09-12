import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
var routes = [
    {
        path: '',
        redirectTo: 'cadastro',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadChildren: './home/home.module#HomePageModule'
    },
    {
        path: 'list',
        loadChildren: './list/list.module#ListPageModule'
    },
    { path: 'cadastro', loadChildren: './cadastro/cadastro.module#CadastroPageModule' },
    { path: 'lojas', loadChildren: './lojas/lojas.module#LojasPageModule' },
    { path: 'cartaz', loadChildren: './cartaz/cartaz.module#CartazPageModule' },
    { path: 'slides', loadChildren: './slides/slides.module#SlidesPageModule' },
    { path: 'super14', loadChildren: './super14/super14.module#Super14PageModule' },
    { path: 'savegnago', loadChildren: './savegnago/savegnago.module#SavegnagoPageModule' },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [RouterModule.forRoot(routes)],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map