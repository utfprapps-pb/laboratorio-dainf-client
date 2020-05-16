import {Component, Injector} from '@angular/core';
import {CrudListComponent} from '../framework/component/crud.list.component';
import {Saida} from './saida';
import {SaidaService} from './saida.service';
import {SaidaItem} from './saidaItem';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-saida',
  templateUrl: './saida.list.component.html',
  styleUrls: ['./saida.list.component.css']
})
export class SaidaListComponent extends CrudListComponent<Saida, number> {

  constructor(protected saidaService: SaidaService,
              protected injector: Injector) {
    super(saidaService, injector, ['id', 'dtSaida', 'qtde', 'usuario', 'observacao', 'actions'], 'saida/form');
  }

  getQtdeTotal(saidaItem: SaidaItem[]) {
    return saidaItem.map(t => t.qtde).reduce((acc, value) => Number(acc) + Number(value), 0);
  }

  preDelete(saida: Saida) {
    if (saida.idEmprestimo) {
      Swal.fire('Atenção!', 'Não é possível remover um registro originado através de uma devolução.', 'info');
    } else {
      this.delete(saida.id);
    }
  }

}
