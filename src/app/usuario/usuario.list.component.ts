import {Component, Injector} from '@angular/core';
import {Usuario} from './usuario';
import {UsuarioService} from './usuario.service';
import {CrudListComponent} from '../framework/component/crud.list.component';
import {Permissao} from './permissao';

@Component({
  selector: 'app-list-usuario',
  templateUrl: './usuario.list.component.html',
  styleUrls: ['./usuario.list.component.css']
})
export class UsuarioListComponent extends CrudListComponent<Usuario, number> {

  constructor(protected usuarioService: UsuarioService,
              protected injector: Injector) {
    super(usuarioService, injector, ['id', 'nome', 'username', 'permissoes', 'actions'], 'usuario/form');

  }

  formatGruposAcesso(permissao: Permissao[]) {
    let toReturn = "";
    for (let i = 0; i < permissao.length; i++) {
      if (permissao[i].nome === 'ROLE_ALUNO') {
        toReturn += 'Aluno';
      } else if (permissao[i].nome === 'ROLE_PROFESSOR') {
        toReturn += 'Professor';
      } else if (permissao[i].nome === 'ROLE_LABORATORISTA') {
        toReturn += 'Laboratorista';
      } else {
        toReturn += 'Administrador';
      }
      if (i != permissao.length - 1) {
        toReturn += ', ';
      }
    }
    return toReturn;
  }

}
