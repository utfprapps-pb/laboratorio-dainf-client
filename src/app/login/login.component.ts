import { Component, OnInit, ViewChild } from "@angular/core";
import { LoginService } from "./login.service";
import { Usuario } from "../usuario/usuario";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { UsuarioService } from "../usuario/usuario.service";
import {
  GoogleLoginProvider,
  SocialAuthService,
} from "@abacritt/angularx-social-login";
import { SocialUser } from "@abacritt/angularx-social-login";
import { TokenDto } from "./token-dto";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  usuario: Usuario;
  showProgress = false;
  @ViewChild("form", { static: true }) form: NgForm;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private messageService: MessageService,
    private usuarioService: UsuarioService
  ) // private socialAuthService: SocialAuthService
  {}

  ngOnInit() {
    this.usuario = new Usuario();
    /* Login com redes sociais - será implementado futuramente
    this.socialAuthService.authState.subscribe((user: SocialUser) => {
      if (user && user.idToken) {
        console.log(user);
        this.showProgress = true;
        this.loginService.loginWithGoogle(user.idToken).subscribe({
          next: (e: TokenDto) => {
            localStorage.setItem("token", e.token);
            localStorage.setItem("social", "true");
            localStorage.setItem("username", e.email);
            this.usuarioService.findByUsername(e.email).subscribe((user) => {
              localStorage.setItem("userLogged", JSON.stringify(user));
              if (user.documento !== "" && user.telefone !== "") {
                this.router.navigate(["/"]);
              } else {
                this.router.navigate([`/usuario/edit/${user.id}`]);
              }
            });
            this.showProgress = false;
          },
          error: () => {
            this.showProgress = false;
            this.messageService.add({
              severity: "error",
              summary: "Atenção",
              detail:
                "É necessário utilizar um email @utfpr.edu.br (@alunos, @professores ou @administrativo.utfpr.edu.br)",
            });
          },
        });
      }
    });
    */
  }

  login() {
    this.showProgress = true;
    this.loginService.login(this.usuario).subscribe({
      next: (e) => {
        localStorage.setItem("token", e);
        localStorage.setItem("username", this.usuario.username);
        this.setUserInLocalStorage();
      },
      error: (error) => {
        this.showProgress = false;
        this.messageService.add({
          severity: "error",
          summary: "Atenção",
          detail: "Usuário e/ou senha incorretos",
        });
      },
    });
  }

  cadastrar() {
    this.router.navigate(["/cadastrar-usuario"]);
  }

  reenviarEmailConfirmacao() {
    this.router.navigate(["/reenviar-email-confirmacao"]);
  }

  recuperarSenha() {
    this.router.navigate(["/recupear-senha"]);
  }

  setUserInLocalStorage() {
    this.usuarioService
      .findByUsername(this.usuario.username)
      .subscribe((user) => {
        localStorage.setItem("userLogged", JSON.stringify(user));
        this.showProgress = false;
        this.router.navigate(["/"]);
      });
  }
}
