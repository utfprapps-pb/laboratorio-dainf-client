import {Component, OnInit, ViewChild} from '@angular/core';
import {SidenavService} from './sidenav.service';
import {NavigationStart, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {MatDrawer} from '@angular/material/sidenav';

export let browserRefresh = false;

export interface MenuItem {
  path: string;
  title: string;
  icon: string;
  id: string;
}

export const ITEM: MenuItem[] = [
  {path: '/', title: 'Home', icon: 'home', id: 'home'},
  {path: '/emprestimo', title: 'Empréstimo', icon: 'business', id: 'emprestimo'},
  {path: '/saida', title: 'Saída', icon: 'arrow_downward', id: 'saida'},
  {path: '/compra', title: 'Compra', icon: 'money', id: 'compra'},
  {path: '/relatorios', title: 'Relatórios', icon: 'equalizer', id: 'relatorios'},
];

export const CADASTROS: MenuItem[] = [
  {path: '/item', title: 'Item', icon: 'business', id: 'item'},
  {path: '/grupo', title: 'Grupo', icon: 'view_compact', id: 'grupo'},
  {path: '/fornecedor', title: 'Fornecedor', icon: 'work', id: 'fornecedor'},
  {path: '/usuario', title: 'Usuário', icon: 'person', id: 'usuario'},
];

export const GERAL: MenuItem[] = [
  {path: '/cidade', title: 'Cidade', icon: 'location_city', id: 'cidade'},
  {path: '/estado', title: 'Estado', icon: 'view_compact', id: 'estado'},
  {path: '/pais', title: 'País', icon: 'emoji_flags', id: 'pais'},
];

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  public menuItems: any[];
  public menuCadastros: any[];
  public menuGeral: any[];
  display = false;
  showSubMenuCadastro = false;
  showSubMenuGerais = false;
  subscription: Subscription;
  @ViewChild('drawer') drawer: MatDrawer;

  constructor(private sidenavService: SidenavService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.initObservableDrawer();
    this.menuItems = ITEM.filter(menuItem => menuItem);
    this.menuCadastros = CADASTROS.filter(menuItem => menuItem);
    this.menuGeral = GERAL.filter(menuItem => menuItem);
    this.initSubscribeMenuItem();
  }

  initObservableDrawer() {
    this.sidenavService.observable().subscribe(hide => {
      if (this.drawer != null) {
        if (hide) {
          this.drawer.close();
        } else {
          this.drawer.open();
        }
      }
    });
  }

  initSubscribeMenuItem() {
    this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        browserRefresh = !this.router.navigated;
        this.changeColorMenuItem();
      }
    });
  }

  toggleSubMenuCadastro() {
    this.showSubMenuCadastro = !this.showSubMenuCadastro;
  }

  toggleSubMenuGerais() {
    this.showSubMenuGerais = !this.showSubMenuGerais;
  }

  changeColorMenuItem() {
    setTimeout(() => {
      const pathCurrent = '/' + window.location.pathname.split('/')[1];
      if (pathCurrent !== '/login') {
        this.menuItems.forEach(menu => {
          this.setColorMenuItem(menu, pathCurrent);
        });
        if (this.showSubMenuCadastro) {
          this.menuCadastros.forEach(menu => {
            this.setColorMenuItem(menu, pathCurrent);
          });
        }
        if (this.showSubMenuGerais) {
          this.menuGeral.forEach(menu => {
            this.setColorMenuItem(menu, pathCurrent);
          });
        }
      }
    }, 100);
  }

  setColorMenuItem(menu: MenuItem, path) {
    if (menu.path === path) {
      document.getElementById(menu.id).style.backgroundColor = '#d2d2d2d1';
    } else {
      document.getElementById(menu.id).style.backgroundColor = '#FFFFFF';
    }
  }
}
