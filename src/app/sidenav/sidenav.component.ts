import {Component, OnInit, ViewChild} from '@angular/core';
import {SidenavService} from './sidenav.service';
import {NavigationStart, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {MatDrawer} from '@angular/material/sidenav';
import {browserChange} from '../app.component';

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

// TODO remover posteriormente
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
    this.menuItems = ITEM.filter(menuItem => menuItem);
    this.menuCadastros = CADASTROS.filter(menuItem => menuItem);
    // this.menuGeral = GERAL.filter(menuItem => menuItem);
  }

  ngOnInit(): void {
    this.changeColorMenuItem();
    this.initObservableDrawer();
    this.initObservableMenuItem();
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

  initObservableMenuItem() {
    browserChange.asObservable().subscribe(value => {
      if (value) {
        this.changeColorMenuItem();
      }
    });
  }

  toggleSubMenuCadastro() {
    this.showSubMenuCadastro = !this.showSubMenuCadastro;
  }

  // toggleSubMenuGerais() {
  //   this.showSubMenuGerais = !this.showSubMenuGerais;
  // }

  changeColorMenuItem() {
    const that = this;
    setTimeout(() => {
      const pathCurrent = '/' + window.location.href.split('#')[1].split('/')[1];
      if (pathCurrent !== '/login') {
        that.menuItems.forEach(menu => {
          that.setColorMenuItem(menu, pathCurrent);
        });
        if (that.showSubMenuCadastro) {
          that.menuCadastros.forEach(menu => {
            that.setColorMenuItem(menu, pathCurrent);
          });
        }
        // if (that.showSubMenuGerais) {
        //   that.menuGeral.forEach(menu => {
        //     that.setColorMenuItem(menu, pathCurrent);
        //   });
        // }
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
