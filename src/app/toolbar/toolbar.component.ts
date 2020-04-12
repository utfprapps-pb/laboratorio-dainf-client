import {Component, HostListener, OnInit} from '@angular/core';
import {LoginService} from '../login/login.service';
import {SidenavService} from '../sidenav/sidenav.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  widthScreen: number;
  sidenavIsOpen: boolean;

  constructor(private loginService: LoginService,
              private sidenavService: SidenavService) {
  }

  ngOnInit() {
  }

  logout() {
    this.loginService.logout();
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.widthScreen = window.innerWidth;
    if (this.widthScreen < 1200) {
      this.hideSidenav();
    } else {
      this.showSidenav();
    }
  }

  hideSidenav() {
    document.getElementById('sidenav').style.width = '0';
    document.getElementById('content').style.width = '100%';
    this.sidenavService.minimizar(true);
    this.sidenavIsOpen = false;
  }

  showSidenav() {
    this.sidenavService.minimizar(false);
    document.getElementById('sidenav').style.width = '250px';
    document.getElementById('content').style.width = 'calc(100% - 250px)';
    this.sidenavIsOpen = true;
  }

  toogleSidenav() {
    if (this.sidenavIsOpen) {
      this.hideSidenav();
    } else {
      this.showSidenav();
    }
  }
}
