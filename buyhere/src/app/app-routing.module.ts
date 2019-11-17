import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './shared/admin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule',
    canActivate:[AdminGuard]
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule',canActivate:[AdminGuard]
  },
  { path: 'cadastro', loadChildren: './pages/Usuario/cadastro/cadastro.module#CadastroPageModule' },
  { path: 'lojas', loadChildren: './pages/lojas/lojas.module#LojasPageModule',canActivate:[AdminGuard] },
  { path: 'cartaz', loadChildren: './cartaz/cartaz.module#CartazPageModule',canActivate:[AdminGuard] },
  { path: 'slides', loadChildren: './slides/slides.module#SlidesPageModule',canActivate:[AdminGuard] },
  { path: 'super14', loadChildren: './super14/super14.module#Super14PageModule',canActivate:[AdminGuard] },
  { path: 'savegnago', loadChildren: './savegnago/savegnago.module#SavegnagoPageModule',canActivate:[AdminGuard] },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'perfil', loadChildren: './pages/Usuario/perfil/perfil.module#PerfilPageModule',canActivate:[AdminGuard] },
  { path: 'carrinho', loadChildren: './pages/carrinho/carrinho.module#CarrinhoPageModule' },
  { path: 'carrinho/:id', loadChildren: './pages/carrinho/carrinho.module#CarrinhoPageModule' },
  { path: 'modal-one', loadChildren: './modal-one/modal-one.module#ModalOnePageModule' },
  // { path: 'input-file', loadChildren: './components/input-file/input-file.module#InputFilePageModule' },
  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
