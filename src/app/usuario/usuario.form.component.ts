import {Component, Injector, ViewChild} from '@angular/core';
import {Usuario} from './usuario';
import {UsuarioService} from './usuario.service';
import {NgForm} from '@angular/forms';
import {CrudFormComponent} from '../util/component/crud.form.component';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './usuario.form.component.html',
  styleUrls: ['./usuario.form.component.css']
})
export class UsuarioFormComponent extends CrudFormComponent<Usuario, number> {

  @ViewChild('form', {static: true}) form: NgForm;

  constructor(protected usuarioService: UsuarioService,
              protected injector: Injector) {
    super(usuarioService, injector, '/usuario');
  }
}
