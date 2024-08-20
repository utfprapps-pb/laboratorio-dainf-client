import { Component, OnInit, ViewChild } from "@angular/core";
import { SidenavService } from "./sidenav.service";
import { MatDrawer } from "@angular/material/sidenav";
import { browserChange } from "../app.component";
import { LoginService } from "../login/login.service";
import { UsuarioService } from "../usuario/usuario.service";

export interface MenuItem {
  path: string;
  title: string;
  icon: string;
  id: string;
  roles?: any;
  group?: any;
}

export const MENU_ITEM: MenuItem[] = [
  {
    path: "/",
    title: "Home",
    icon: "home",
    id: "home",
    group: "ITEM",
  },
  {
    path: "/emprestimo",
    title: "Empréstimo",
    icon: "handshake-o",
    id: "emprestimo",
    group: "ITEM",
  },
  {
    path: "/item",
    title: "Item",
    icon: "microchip",
    id: "item",
    roles: ["ADMINISTRADOR", "LABORATORISTA"],
    group: "CADASTRO",
  },
  {
    path: "/grupo",
    title: "Grupo",
    icon: "sitemap",
    id: "grupo",
    roles: ["ADMINISTRADOR", "LABORATORISTA"],
    group: "CADASTRO",
  },
  {
    path: "/fornecedor",
    title: "Fornecedor",
    icon: "briefcase",
    id: "fornecedor",
    roles: ["ADMINISTRADOR", "LABORATORISTA"],
    group: "CADASTRO",
  },
  {
    path: "/usuario",
    title: "Usuário",
    icon: "users",
    id: "usuario",
    roles: ["ADMINISTRADOR"],
    group: "CADASTRO",
  },
  {
    path: "/saida",
    title: "Saída",
    icon: "arrow-down",
    id: "saida",
    roles: ["ADMINISTRADOR", "LABORATORISTA"],
    group: "ITEM",
  },
  {
    path: "/reserva",
    title: "Reserva",
    icon: "paste",
    id: "reserva",
    group: "ITEM",
  },
  {
    path: "/item",
    title: "Itens",
    icon: "microchip",
    id: "item",
    roles: ["ALUNO"],
    group: "ITEM",
  },
  {
    path: "/solicitacao-compra",
    title: "Sol. de Compra",
    icon: "list",
    id: "solicitacao",
    group: "ITEM",
  },
  {
    path: "/compra",
    title: "Compra",
    icon: "shopping-cart",
    id: "compra",
    roles: ["ADMINISTRADOR", "LABORATORISTA"],
    group: "ITEM",
  },
  {
    path: "/relatorio",
    title: "Relatórios",
    icon: "line-chart",
    id: "relatorios",
    roles: ["ADMINISTRADOR", "LABORATORISTA"],
    group: "ITEM",
  },
];

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.css"],
})
export class SidenavComponent implements OnInit {
  public menuItems: any[];
  public menuCadastros: any[];
  display = false;
  showSubMenuCadastro = false;
  showCadastros = true;
  @ViewChild("drawer") drawer: MatDrawer;

  constructor(
    private sidenavService: SidenavService,
    private loginService: LoginService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.buildMenu();
    this.changeStylesDrawer();
    this.changeColorMenuItem();
    this.initObservableDrawer();
    this.initObservableMenuItem();
  }

  buildMenu() {
    this.menuItems = new Array();
    this.menuCadastros = new Array();
    this.loginService.getPermissoesUser().subscribe((permissoes) => {
      const userRoles = permissoes.map((x: any) => x.nome.replace("ROLE_", ""));
      this.showCadastros = userRoles.indexOf("ALUNO") < 0 ? true : false;
      const items = [];
      MENU_ITEM.forEach((menu: any) => {
        if (menu.roles != null) {
          if (
            menu.roles.filter((value) => -1 !== userRoles.indexOf(value))
              .length > 0
          ) {
            items.push(menu);
          }
        } else {
          items.push(menu);
        }
      });
      items.forEach((value) => {
        if (value.group === "ITEM") {
          this.menuItems.push(value);
        } else if (value.group === "CADASTRO") {
          this.menuCadastros.push(value);
        }
      });
    });
  }

  initObservableDrawer() {
    this.sidenavService.observable().subscribe((hide) => {
      if (this.drawer != null) {
        if (hide) {
          this.drawer.close();
        } else {
          this.drawer.open();
        }
        this.changeStylesDrawer();
      }
    });
  }

  initObservableMenuItem() {
    browserChange.asObservable().subscribe((value) => {
      if (value) {
        this.changeColorMenuItem();
      }
    });
  }

  toggleSubMenuCadastro() {
    this.showSubMenuCadastro = !this.showSubMenuCadastro;
  }

  changeColorMenuItem() {
    const that = this;
    setTimeout(() => {
      const pathCurrent =
        "/" + window.location.href.split("#")[1].split("/")[1];
      if (pathCurrent !== "/login") {
        that.menuItems.forEach((menu) => {
          that.setColorMenuItem(menu, pathCurrent);
        });
        if (that.showSubMenuCadastro) {
          that.menuCadastros.forEach((menu) => {
            that.setColorMenuItem(menu, pathCurrent);
          });
        }
      }
    }, 100);
  }

  setColorMenuItem(menu: MenuItem, path) {
    if (menu.path === path) {
      document.getElementById(menu.id).style.backgroundColor = "#1b2231";
    } else {
      document.getElementById(menu.id).style.backgroundColor = "transparent";
    }
  }

  changeStylesDrawer() {
    if (window.innerWidth < 1200) {
      document.getElementById("drawer").classList.remove("float-drawer");
    } else {
      document.getElementById("drawer").classList.add("float-drawer");
    }
  }
}
