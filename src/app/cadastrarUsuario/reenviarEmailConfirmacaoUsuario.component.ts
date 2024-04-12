import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { CadastrarUsuarioService } from "./cadastrarUsuario.service";
import { EmailConfirmacao } from "./emailConfirmacao";

@Component({
  selector: "app-reenviar-email-confirmacao-usuario",
  templateUrl: "./reenviarEmailConfirmacaoUsuario.component.html",
  styleUrls: ["./reenviarEmailConfirmacaoUsuario.component.css"],
})
export class ReenviarEmailConfirmacaoUsuarioComponent implements OnInit {
  emailConfirmacao: EmailConfirmacao;
  showProgress = false;
  @ViewChild("form", { static: true }) form: NgForm;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private cadastrarUsuarioService: CadastrarUsuarioService
  ) {}

  ngOnInit() {
    this.emailConfirmacao = new EmailConfirmacao();
  }

  submit() {
    this.showProgress = true;
    this.cadastrarUsuarioService.resendConfirmEmail(this.emailConfirmacao).subscribe({
      next: (e) => {
        this.showProgress = false;
        this.messageService.add({
          severity: "success",
          summary: "Sucesso",
          detail:
            "Um email foi enviado contento o link para confirmação do email.",
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
            "O email informado não está cadastrado no sistema ou já foi confirmado.",
        });
      },
    });
  }

  goToLogin() {
    this.router.navigate(["/login"]);
  }
  goToCadastro() {
    this.router.navigate(["/cadastrar-usuario"]);
  }
}
