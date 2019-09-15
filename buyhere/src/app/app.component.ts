import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserService } from './api/user.service';
import { IMenu } from './Interface/IMenu';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit{
  isLogged:boolean = false;
  menu: Array<IMenu> = new Array<IMenu>();
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Carrinho',
      url: '/carrinho',
      icon: 'cart'
    },
    {
      title:'Lojas',
      url:this.newMethod(),
      icon:'card'
    },
    {
      title:'Perfil',
      url:'/perfil',
      icon:'person'
    },
    
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private userService: UserService
  ) {
    this.initializeApp();
  }

  private newMethod() {
    return '/lojas';
  }

  ngOnInit():void{
    this.isLogged = this.userService.isStaticLogged;
      this.userService.isLogged.subscribe(logged =>{
        this.isLogged = logged;
      });

      this.menu.push({
        group:'Perfil',
        items:[
          {icon:'person', label: 'Perfil', url:'/perfil'}
        ]
      })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
