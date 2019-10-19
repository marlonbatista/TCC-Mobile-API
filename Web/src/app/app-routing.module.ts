import { UserComponent } from './pages/user/user.component';
import { UsersComponent } from './pages/users/users.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { AdminGuard } from './shared/admin.guard';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {  ProdutosComponent } from './pages/produtos/produtos.component';
import { ProdutoComponent } from './pages/produto/produto.component';
import { LoginComponent } from './pages/login/login.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AdminGuard] },
  { path: 'Produtos', component: ProdutosComponent, canActivate: [AdminGuard] },
  { path: 'Produtos/:id', component: ProdutoComponent, canActivate: [AdminGuard] },
  { path: 'Customers', component: CustomersComponent, canActivate: [AdminGuard] },
  { path: 'Customers/:id', component: CustomerComponent, canActivate: [AdminGuard] },
  { path: 'Users', component: UsersComponent, canActivate: [AdminGuard] },
  { path: 'Users/:id', component: UserComponent, canActivate: [AdminGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
