import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { CadastrarUsuarioService } from "./cadastrarUsuario.service";
import { EmailConfirmacao } from "./emailConfirmacao";
import { RecuperarSenha } from "./recuperarSenha";

@Component({
  selector: "app-recuperar-senha",
  templateUrl: "./recuperarSenha.component.html",
  styleUrls: ["./recuperarSenha.component.css"],
})
export class RecuperarSenhaComponent implements OnInit {
  emailConfirmacao: EmailConfirmacao = new EmailConfirmacao();
  recuperarSenha: RecuperarSenha = new RecuperarSenha();

  showProgress = false;
  @ViewChild("form", { static: true }) form: NgForm;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private cadastrarUsuarioService: CadastrarUsuarioService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.emailConfirmacao = new EmailConfirmacao();

    this.route.params.subscribe((params) => {
      if (params.code) {
        this.recuperarSenha.code = params.code;
      } else {
        this.recuperarSenha.code = null;
      }
    });
  }

  submit() {
    if (this.recuperarSenha.code !== null && this.recuperarSenha.code !== "") {
      if (this.verificarSenhas()) {
        this.showProgress = true;
        this.cadastrarUsuarioService
          .recuperarSenha(this.recuperarSenha)
          .subscribe({
            next: (e) => {
              this.showProgress = false;
              this.messageService.add({
                severity: "success",
                summary: "Sucesso",
                detail:
                  "Senha atualizada com sucesso. Efetue o login com a nova senha",
              });
              this.router.navigate(["/login"]);
            },
            error: (error) => {
              console.log(error);
              this.showProgress = false;
              this.messageService.add({
                severity: "error",
                summary: "Atenção",
                detail:
                  "Verifique se as senhas digitadas são iguais e possuem pelo menos 6 digitos.",
              });
            },
          });
      } else {
        this.messageService.add({
          severity: "error",
          summary: "Atenção",
          detail:
            "Verifique se as senhas digitadas são iguais e possuem pelo menos 6 digitos.",
        });
      }
    } else {
      this.showProgress = true;
      this.cadastrarUsuarioService
        .requisitarRecuperarSenha(this.emailConfirmacao)
        .subscribe({
          next: (e) => {
            this.showProgress = false;
            this.messageService.add({
              severity: "success",
              summary: "Sucesso",
              detail:
                "Um email foi enviado contento o link para recuperação da senha.",
            });
            this.router.navigate(["/login"]);
          },
          error: (error) => {
            console.log(error);
            this.showProgress = false;
            this.messageService.add({
              severity: "error",
              summary: "Atenção",
              detail: "O email informado não está cadastrado no sistema.",
            });
          },
        });
    }
  }

  verificarSenhas(): boolean {
    if (
      this.recuperarSenha.password === this.recuperarSenha.repeatPassword &&
      this.recuperarSenha.password.length >= 6
    ) {
      return true;
    }
    return false;
  }

  goToLogin() {
    this.router.navigate(["/login"]);
  }
  goToCadastro() {
    this.router.navigate(["/cadastrar-usuario"]);
  }
}
