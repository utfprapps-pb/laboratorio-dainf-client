import {Component, Injector} from '@angular/core';
import {CrudFormComponent} from '../util/component/crud.form.component';
import {Emprestimo} from './emprestimo';
import {EmprestimoService} from './emprestimo.service';

@Component({
  selector: 'app-form--emprestimo',
  templateUrl: './emprestimo.form.component.html',
  styleUrls: ['./emprestimo.form.component.css']
})
export class EmprestimoFormComponent extends CrudFormComponent<Emprestimo, number> {

  constructor(protected emprestimoService: EmprestimoService,
              protected injector: Injector) {
    super(emprestimoService, injector, '/emprestimo');
  }
}
