import {Component, Injector} from '@angular/core';
import {Usuario} from './usuario';
import {UsuarioService} from './usuario.service';
import {CrudListComponent} from '../util/component/crud.list.component';

@Component({
  selector: 'app-list-usuario',
  templateUrl: './usuario.list.component.html',
  styleUrls: ['./usuario.list.component.css']
})
export class UsuarioListComponent extends CrudListComponent<Usuario, number> {

  constructor(protected usuarioService: UsuarioService,
              protected injector: Injector) {
    super(usuarioService, injector, ['id', 'nome', 'username', 'actions'], 'usuario/form');
  }
}
