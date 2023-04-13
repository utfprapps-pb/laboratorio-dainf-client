import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable, Subject, throwError } from "rxjs";
import { Usuario } from "../usuario/usuario";
import { environment } from "../../environments/environment";
import { catchError, map } from "rxjs/operators";
import { UsuarioService } from "../usuario/usuario.service";
import { Permissao } from "../usuario/permissao";
import { TokenDto } from "./token-dto";

@Injectable()
export class LoginService {
  url: string;
  isAuthenticated = new Subject<boolean>();
  isRunningRequest = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private usuarioService: UsuarioService
  ) {
    this.url = environment.api_url + "login";
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const url = `${environment.api_url}usuario/user-info`;
    this.isRunningRequest = true;

    return this.http.get(url).pipe(
      map((e) => {
        this.isRunningRequest = false;
        this.isAuthenticated.next(true);
        if (JSON.parse(localStorage.getItem("userLogged")).documento === "" && !route.url[0].path.includes("usuario")) {
          this.router.navigate([`/usuario/edit/${JSON.parse(localStorage.getItem("userLogged")).id}`]);
        }
        return true;
      }),
      catchError((err) => {
        this.isRunningRequest = false;
        this.logout();
        return throwError(new Error("O usuário não está autenticado!"));
      })
    );
  }

  getPermissoesUser(): Observable<Permissao[]> {
    const username = localStorage.getItem("username");
    return this.usuarioService.findByUsername(username).pipe(
      map((value) => {
        return value.permissoes;
      })
    );
  }

  hasAnyRole(componentRoles: any) {
    const loggedUser = JSON.parse(localStorage.getItem("userLogged"));
    if (loggedUser != null) {
      let hasRole = false;
      loggedUser.authorities.forEach((p) => {
        if (componentRoles.includes(p.nome)) {
          hasRole = true;
          return false;
        }
      });
      return hasRole;
    } else {
      this.logout();
    }
  }

  userLoggedIsAlunoOrProfessor(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      resolve(!this.hasAnyRole(["ROLE_ADMINISTRADOR", "ROLE_LABORATORISTA"]));
    });
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userLogged");
    this.isAuthenticated.next(false);
    this.router.navigate(["/login"]);
  }

  login(usuario: Usuario): Observable<string> {
    return this.http
      .post<string>(this.url, usuario, { responseType: "text" as "json" })
      .pipe(
        map((value) => {
          this.isAuthenticated.next(true);
          return value;
        })
      );
  }
  
  loginWithGoogle(idToken: string): Observable<TokenDto> {
    const url = `${environment.api_url}auth`;
    const headers = {
      headers: new HttpHeaders({ "Auth-Id-Token": `Bearer ${idToken}`}),
    };

    return this.http.post<TokenDto>(
      url,
      '',
      headers
    );
  }
}
