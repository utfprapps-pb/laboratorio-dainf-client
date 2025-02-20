import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { UsuarioCadastro } from "./usuarioCadastro";
import { CadastrarUsuarioService } from "./cadastrarUsuario.service";

@Component({
  selector: "app-cadastrar-usuario",
  templateUrl: "./cadastrarUsuario.component.html",
  styleUrls: ["./cadastrarUsuario.component.css"],
})
export class CadastrarUsuarioComponent implements OnInit {
  usuario: UsuarioCadastro;
  showProgress = false;
  @ViewChild("form", { static: true }) form: NgForm;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private cadastrarUsuarioService: CadastrarUsuarioService
  ) {}

  ngOnInit() {
    this.usuario = new UsuarioCadastro();
  }

  submit() {
    if (this.isFormValid()) {
      this.showProgress = true;
      this.cadastrarUsuarioService.saveUser(this.usuario).subscribe({
        next: (e) => {
          this.showProgress = false;
          this.messageService.add({
            severity: "success",
            summary: "Sucesso",
            detail:
              "Cadastro realizado com sucesso. Um email de confirmação foi enviado para o endereço de email cadastrado.",
          });
          this.router.navigate(["/login"]);
        },
        error: (error) => {
          this.showProgress = false;
          this.messageService.add({
            severity: "error",
            summary: "Atenção",
            detail:
              "Verifique o formulário, os dados de cadastro estão incorretos",
          });
        },
      });
    } else {
      console.log("Formulário inválido");
    }
  }

  isFormValid(): boolean {
    let formValid = this.form.valid;
    let passwordInvalid = false;

    if (this.usuario.password !== this.usuario.confirmPassword) {
      this.form.controls["confirmPassword"].setErrors({
        incorrect: true,
        message: "As senhas não conferem",
      });
      formValid = false;
      passwordInvalid = true;
    }
    if (this.usuario.password?.length < 6) {
      this.form.controls["password"].setErrors({
        incorrect: true,
        message: "A senha deve ter no mínimo 6 caracteres",
      });
      this.form.controls["confirmPassword"].setErrors({
        incorrect: true,
        message: "A senha deve ter no mínimo 6 caracteres",
      });
      formValid = false;
      passwordInvalid = true;
    }

    if (!passwordInvalid) {
      this.form.controls["password"].setErrors({ incorrect: false });
      this.form.controls["password"].updateValueAndValidity();
      this.form.controls["confirmPassword"].setErrors({ incorrect: false });
      this.form.controls["confirmPassword"].updateValueAndValidity();
    }

    if (
      this.usuario.email &&
      !this.usuario.email.endsWith("@utfpr.edu.br") &&
      !this.usuario.email?.endsWith("@alunos.utfpr.edu.br")
    ) {
      this.form.controls["email"].setErrors({
        incorrect: true,
        message: "Digite um email válido da UTFPR",
      });
      formValid = false;
    } else {
      this.form.controls["email"].setErrors({ incorrect: false });
      this.form.controls["email"].updateValueAndValidity();
    }

    return formValid;
  }

  goToLogin() {
    this.router.navigate(["/login"]);
  }
}
