import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxSpinnerModule } from 'ngx-spinner';

import {
  MatToolbarModule, MatIconModule,
  MatButtonModule, MatSidenavModule,
  MatListModule,
  MatTableModule,
  MatCardModule,
  MatGridListModule,
  MatFormField,
  MatInputModule,
  MatSnackBarModule,
  MatPaginatorModule,
  MatPaginatorIntl,
  MatSelectModule,
  MatCheckboxModule
} from '@angular/material';

import { PedidosPendentesComponent } from './components/pedidos-pendentes/pedidos-pendentes.component';
import { CardsDashboardComponent } from './components/cards-dashboard/cards-dashboard.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { ProdutoComponent } from './pages/produto/produto.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { getPaginatorIntl } from './shared/paginator-intl';
import { CustomerComponent } from './pages/customer/customer.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { InputFileComponent } from './components/input-file/input-file.component';
import { UsersComponent } from './pages/users/users.component';
import { UserComponent } from './pages/user/user.component';
import { ChartBarComponent } from './components/chart-bar/chart-bar.component';
import { ChartPieChartComponent } from './components/chart-pie-chart/chart-pie-chart.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';


@NgModule({
  declarations: [
    AppComponent,
    PedidosPendentesComponent,
    CardsDashboardComponent,
    ProdutosComponent,
    ProdutoComponent,
    HomeComponent,
    LoginComponent,
    CustomerComponent,
    CustomersComponent,
    InputFileComponent,
    
    UsersComponent,
    UserComponent,
    ChartBarComponent,
    ChartPieChartComponent,
    PedidosComponent,
    
  ],
  imports: [
    BrowserModule,
   
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSpinnerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatGridListModule,
    MatListModule,
    MatTableModule,
    MatCardModule,
    MatInputModule,
    MatSnackBarModule,
    MatPaginatorModule, 
    MatSelectModule, 
    MatCheckboxModule
  ],
  providers: [{
    provide: MatPaginatorIntl, useValue: getPaginatorIntl()
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
