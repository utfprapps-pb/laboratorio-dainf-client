import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  display = false;
  showSubMenuCadastro = false;
  showSubMenuGerais = false;

  constructor() {

  }

  ngOnInit(): void {
  }

  // openSidenav() {
  //   if (!this.display) {
  //     this.showSubMenuGerais = false;
  //     this.showSubMenuCadastro = false;
  //   }
  //   this.display = true;
  // }

  toggleSubMenuCadastro() {
    this.showSubMenuCadastro = !this.showSubMenuCadastro;
  }

  toggleSubMenuGerais() {
    this.showSubMenuGerais = !this.showSubMenuGerais;
  }
}
