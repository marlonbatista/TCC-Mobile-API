import { UserService } from './services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IMenu } from './interfaces/IMenu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  isLogged: boolean = false;
  subscrip: Subscription;

  menu: Array<IMenu> = new Array<IMenu>();

  constructor(private userService: UserService) {

  }

  ngOnDestroy() {
    this.subscrip.unsubscribe();
  }
  deslog(){
    this.isLogged = false;
    localStorage.clear();
    location.reload();
    
  }

  ngOnInit() {
    this.isLogged = this.userService.isStaticLogged;
    this.subscrip = this.userService.isLogged.subscribe(logged => {
      this.isLogged = logged;
    });

    this.menu.push({
      group: 'Produtos',
      items: [
        { icon: 'shopping-basket', label: 'Produtos', url: '/Produtos' },
        // { icon: 'bookmark_border', label: ' SubCategorias', url: '/SubCategorys' },
        // { icon: 'assignment', label: 'Questões', url: '/Questions' },
      ]
    });

    this.menu.push({
      group: 'Pessoas',
      items: [
        // { icon: 'person', label: 'Profissionais', url: '/ServiceProviders' },
        { icon: 'person_pin', label: ' Clientes', url: '/Customers' },
      ]
    });

    this.menu.push({
      group: 'Segurança',
      items: [
        { icon: 'security', label: 'Loja', url: '/Users' }
      ]
    });

    this.menu.push({
      group: 'Gerenciamento',
      items: [
        { icon: 'format_list_bulleted', label: 'Pedidos', url: '/Pedidos' }
      ]
    });
  }
}
