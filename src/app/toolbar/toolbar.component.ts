import { Component, HostListener, OnInit } from "@angular/core";
import { LoginService } from "../login/login.service";
import { SidenavService } from "../sidenav/sidenav.service";
import { MenuItem } from "primeng/api";
// import { SocialAuthService } from "@abacritt/angularx-social-login";
import { Router } from "@angular/router";
import { Usuario } from "../usuario/usuario";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.css"],
})
export class ToolbarComponent implements OnInit {
  widthScreen: number;
  sidenavIsOpen: boolean;
  items: MenuItem[];
  fotoUrl: string;

  constructor(
    private loginService: LoginService,
    private sidenavService: SidenavService,
    // private socialAuthService: SocialAuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getScreenSize();
    this.buildListenerCloseDrawer();
    this.optionDropdown();
    this.fotoUrl = JSON.parse(localStorage.getItem("userLogged")).fotoUrl;
  }

  logout() {
    // this.socialAuthService.signOut();
    this.loginService.logout();
  }

  buildListenerCloseDrawer() {
    document.getElementById("content").addEventListener("click", (ev) => {
      if (this.widthScreen < 1200) {
        this.hideSidenav();
      }
    });
  }

  @HostListener("window:resize", ["$event"])
  getScreenSize(event?) {
    this.widthScreen = window.innerWidth;
    if (this.widthScreen < 1200) {
      this.hideSidenav();
    } else {
      this.showSidenav(false);
    }
  }

  hideSidenav() {
    document.getElementById("sidenav").classList.remove("sidenav-drawer-on");
    document.getElementById("content").classList.remove("content-responsive");
    document.getElementById("sidenav").style.width = "0";
    document.getElementById("content").style.width = "100%";
    this.sidenavService.minimizar(true);
    this.sidenavIsOpen = false;
  }

  showSidenav(isBtnToogle) {
    this.sidenavService.minimizar(false);
    if (isBtnToogle) {
      document.getElementById("sidenav").classList.add("sidenav-drawer-on");
      document.getElementById("content").classList.add("content-responsive");
    } else {
      document.getElementById("sidenav").classList.remove("sidenav-drawer-on");
      document.getElementById("content").classList.remove("content-responsive");
      document.getElementById("sidenav").style.width = "260px";
      document.getElementById("content").style.width = "calc(100% - 260px)";
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
        label: "Meus dados",
        icon: "pi pi-user-edit",
        command: () => this.openEditForm(),
      },
      {
        label: "Sair",
        icon: "pi pi-external-link",
        command: () => this.logout(),
      },
    ];
  }

  getUserLogado() {
    return localStorage.getItem("username");
  }

  openEditForm() {
    const id = JSON.parse(localStorage.getItem("userLogged")).id;
    this.router.navigate([`/usuario/edit/${id}`]);
  }
}
