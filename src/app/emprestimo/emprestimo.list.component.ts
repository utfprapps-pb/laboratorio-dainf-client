import {Component, Injector, OnInit} from '@angular/core';
import {CrudListComponent} from '../util/component/crud.list.component';
import {Emprestimo} from './emprestimo';
import {CompraService} from '../compra/compra.service';
import {EmprestimoService} from './emprestimo.service';

@Component({
  selector: 'app-list-emprestimo',
  templateUrl: './emprestimo.list.component.html',
  styleUrls: ['./emprestimo.list.component.css']
})
export class EmprestimoListComponent extends CrudListComponent<Emprestimo, number> {

  constructor(protected emprestimoService: EmprestimoService,
              protected injector: Injector) {
    super(emprestimoService, injector, ['id', 'usuarioEmprestimo', 'usuarioResponsavel', 'dataEmprestimo', 'actions'], 'emprestimo/form');
  }

}
