import { Component, Injector, ViewChild } from "@angular/core";
import { Usuario } from "./usuario";
import { UsuarioService } from "./usuario.service";
import { NgForm } from "@angular/forms";
import { CrudFormComponent } from "../framework/component/crud.form.component";
import { SelectItem } from "primeng/api";
import Swal from "sweetalert2";

@Component({
  selector: "app-edit-usuario",
  templateUrl: "./usuario.edit.component.html",
  styleUrls: ["./usuario.edit.component.css"],
})
export class UsuarioEditComponent extends CrudFormComponent<Usuario, number> {
  @ViewChild("form", { static: true }) form: NgForm;
  @ViewChild("formChangeSenha", { static: true }) formChangeSenha: NgForm;
  grupoAcessoDropdown: SelectItem[];
  dialogChangeSenha = false;
  redSenhaAtual: string;
  redConfNovaSenha: string;
  redNovaSenha: string;

  constructor(
    protected usuarioService: UsuarioService,
    protected injector: Injector
  ) {
    super(usuarioService, injector, "/usuario");
    this.buildGrupoDeAcesso();
  }

  buildGrupoDeAcesso() {
    this.usuarioService.findAllPermissao().subscribe((e) => {
      this.grupoAcessoDropdown = new Array();
      if (e != null) {
        e.forEach((permissao) => {
          this.grupoAcessoDropdown.push({
            label: this.formatRule(permissao.nome),
            value: permissao,
          });
        });
        if (!this.editando) {
          this.object.permissoes = [];
          this.object.permissoes.push(e[0]);
        }
      }
    });
  }

  formatRule(nome) {
    let toReturn = nome.replace("ROLE_", "");
    toReturn =
      toReturn.charAt(0).toUpperCase() + toReturn.slice(1).toLowerCase();
    return toReturn;
  }

  showDialogChangeSenha() {
    this.dialogChangeSenha = true;
  }

  redefinirSenha() {
    if (this.formChangeSenha.valid) {
      if (this.redNovaSenha !== this.redConfNovaSenha) {
        this.messageService.add({
          severity: "error",
          summary: "Atenção",
          detail: "Senhas não conferem!",
        });
      } else {
        this.object.password = this.redNovaSenha;
        this.usuarioService
          .changeSenha(this.object, this.redSenhaAtual)
          .subscribe(
            (e) => {
              this.messageService.add({
                severity: "success",
                summary: "Sucesso",
                detail: "Senha redefinida com sucesso!",
              });
              this.formChangeSenha.reset();
              this.dialogChangeSenha = false;
            },
            (error) => {
              this.messageService.add({
                severity: "error",
                summary: "Atenção",
                detail: "A senha atual está incorreta!",
              });
            }
          );
      }
    } else {
      this.validarFormulario(this.formChangeSenha);
    }
  }

  updateUser() {
    this.loaderService.display(true);
    if (this.isValid() && this.validExtra) {
      this.usuarioService.updateUser(this.object).subscribe({
        next: (e) => {
          localStorage.setItem("userLogged", JSON.stringify(this.object));
          this.loaderService.display(false);            
          Swal.fire("Sucesso!", "Registro salvo com sucesso!", "success");            
        },
        error: (error) => {
          this.loaderService.display(false);
          Swal.fire(
            "Atenção!",
            "Ocorreu um erro ao salvar o registro!",
            "error"
          );          
        },
      });
    } else {
      this.loaderService.display(false);
      this.messageService.add({
        severity: "info",
        summary: "Atenção",
        detail: "Necessário preencher todos os campos corretamente!",
      });
      this.validarFormulario();
    }
  }
}
