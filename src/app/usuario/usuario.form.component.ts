import {Component, Injector, ViewChild} from '@angular/core';
import {Usuario} from './usuario';
import {UsuarioService} from './usuario.service';
import {NgForm} from '@angular/forms';
import {CrudFormComponent} from '../util/component/crud.form.component';
import {SelectItem} from 'primeng';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './usuario.form.component.html',
  styleUrls: ['./usuario.form.component.css']
})
export class UsuarioFormComponent extends CrudFormComponent<Usuario, number> {

  @ViewChild('form', {static: true}) form: NgForm;
  grupoAcessoDropdown: SelectItem[];
  dialogChangeSenha = false;
  redSenhaAtual: string;
  redConfNovaSenha: string;
  redNovaSenha: string;

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
            this.grupoAcessoDropdown.push({label: permissao.nome, value: new Array(permissao)});
          });
        }
      });
  }

  showDialogChangeSenha() {
    this.dialogChangeSenha = true;
  }

  redefinirSenha() {
    if (this.redNovaSenha !== this.redConfNovaSenha) {
      this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Senhas não conferem!'});
    } else {
      this.object.password = this.redNovaSenha;
      this.usuarioService.changeSenha(this.object, this.redSenhaAtual)
        .subscribe(e => {
          this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Senha redefinida com sucesso!'});
        }, error => {
          this.messageService.add({severity: 'error', summary: 'Atenção', detail: 'A senha atual está incorreta!'});
        });
    }
  }
}
