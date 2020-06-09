import {Component, Injector, ViewChild} from '@angular/core';
import {Usuario} from './usuario';
import {UsuarioService} from './usuario.service';
import {NgForm} from '@angular/forms';
import {CrudFormComponent} from '../framework/component/crud.form.component';
import {SelectItem} from 'primeng';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './usuario.form.component.html',
  styleUrls: ['./usuario.form.component.css']
})
export class UsuarioFormComponent extends CrudFormComponent<Usuario, number> {

  @ViewChild('form', {static: true}) form: NgForm;
  @ViewChild('formChangeSenha', {static: true}) formChangeSenha: NgForm;
  grupoAcessoDropdown: SelectItem[];
  dialogChangeSenha = false;
  redSenhaAtual: string;
  redConfNovaSenha: string;
  redNovaSenha: string;
  labelDocumento: string;

  constructor(protected usuarioService: UsuarioService,
              protected injector: Injector) {
    super(usuarioService, injector, '/usuario');
    this.buildGrupoDeAcesso();
  }

  buildGrupoDeAcesso() {
    this.usuarioService.findAllPermissao()
      .subscribe(e => {
        this.grupoAcessoDropdown = new Array();
        if (e != null) {
          e.forEach(permissao => {
            this.grupoAcessoDropdown.push({label: this.formatRule(permissao.nome), value: permissao});
          });
          if (!this.editando) {
            this.object.permissoes = [];
            this.object.permissoes.push(e[0]);
            this.buildLabelDocumento();
          }
        }
      });
  }

  formatRule(nome) {
    let toReturn = nome.replace('ROLE_', '');
    toReturn = toReturn.charAt(0).toUpperCase() + toReturn.slice(1).toLowerCase();
    return toReturn;
  }

  postEdit(): void {
    this.buildLabelDocumento();
  }

  showDialogChangeSenha() {
    this.dialogChangeSenha = true;
  }

  redefinirSenha() {
    if (this.formChangeSenha.valid) {
      if (this.redNovaSenha !== this.redConfNovaSenha) {
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Senhas não conferem!'});
      } else {
        this.object.password = this.redNovaSenha;
        this.usuarioService.changeSenha(this.object, this.redSenhaAtual)
          .subscribe(e => {
            this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Senha redefinida com sucesso!'});
            this.formChangeSenha.reset();
            this.dialogChangeSenha = false;
          }, error => {
            this.messageService.add({severity: 'error', summary: 'Atenção', detail: 'A senha atual está incorreta!'});
          });
      }
    } else {
      this.validarFormulario(this.formChangeSenha);
    }
  }

  buildLabelDocumento() {
    const permissao = this.object.permissoes[0].nome;
    if (permissao === 'ROLE_ALUNO') {
      this.labelDocumento = 'RA';
    } else {
      this.labelDocumento = 'SIAPE';
    }
  }
}
