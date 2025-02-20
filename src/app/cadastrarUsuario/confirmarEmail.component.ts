import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { CadastrarUsuarioService } from "./cadastrarUsuario.service";
import { EmailConfirmacao } from "./emailConfirmacao";

@Component({
  selector: "app-confirmarvalidar-email",
  templateUrl: "./confirmarEmail.component.html",
  styleUrls: ["./confirmarEmail.component.css"],
})
export class ConfirmarEmailComponent implements OnInit {
  emailConfirmacao: EmailConfirmacao;
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
        this.emailConfirmacao.code = params.code;
      }
    });
  }

  submit() {
    this.showProgress = true;
    this.cadastrarUsuarioService
      .confirmarEmail(this.emailConfirmacao)
      .subscribe({
        next: (e) => {
          this.showProgress = false;
          this.messageService.add({
            severity: "success",
            summary: "Sucesso",
            detail:
              "Email validado com sucesso, agora será possível realizar autenticação no sistema.",
          });
          this.router.navigate(["/login"]);
        },
        error: (error) => {
          this.showProgress = false;
          this.messageService.add({
            severity: "error",
            summary: "Atenção",
            detail:
              "Falha ao confirmar o email, entre em contato com os responsáveis pelos laboratórios.",
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
