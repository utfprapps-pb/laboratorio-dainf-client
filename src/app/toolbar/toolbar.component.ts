import {Component, HostListener, OnInit} from '@angular/core';
import {LoginService} from '../login/login.service';
import {SidenavService} from '../sidenav/sidenav.service';
import {MenuItem} from 'primeng';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  widthScreen: number;
  sidenavIsOpen: boolean;
  items: MenuItem[];

  constructor(private loginService: LoginService,
              private sidenavService: SidenavService) {
  }

  ngOnInit() {
    this.getScreenSize();
    this.buildListenerCloseDrawer();
    this.optionDropdown();
  }

  logout() {
    this.loginService.logout();
  }

  buildListenerCloseDrawer() {
    document.getElementById('content').addEventListener('click', ev => {
      if (this.widthScreen < 1200) {
        this.hideSidenav();
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.widthScreen = window.innerWidth;
    if (this.widthScreen < 1200) {
      this.hideSidenav();
    } else {
      this.showSidenav(false);
    }
  }

  hideSidenav() {
    document.getElementById('sidenav').classList.remove('sidenav-drawer-on');
    document.getElementById('content').classList.remove('content-responsive');
    document.getElementById('sidenav').style.width = '0';
    document.getElementById('content').style.width = '100%';
    this.sidenavService.minimizar(true);
    this.sidenavIsOpen = false;
  }

  showSidenav(isBtnToogle) {
    this.sidenavService.minimizar(false);
    if (isBtnToogle) {
      document.getElementById('sidenav').classList.add('sidenav-drawer-on');
      document.getElementById('content').classList.add('content-responsive');
    } else {
      document.getElementById('sidenav').classList.remove('sidenav-drawer-on');
      document.getElementById('content').classList.remove('content-responsive');
      document.getElementById('sidenav').style.width = '260px';
      document.getElementById('content').style.width = 'calc(100% - 260px)';
    }
    this.sidenavIsOpen = true;
  }

  toogleSidenav() {
    if (this.sidenavIsOpen) {
      this.hideSidenav();
    } else {
      this.showSidenav(true);
    }
  }

  optionDropdown() {
    this.items = [
      {
        label: 'Sair', icon: 'pi pi-external-link', command: () => this.logout()
      }
    ];
  }

  getUserLogado() {
    return localStorage.getItem('username');
  }
}
