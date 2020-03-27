import {Component, Injector} from '@angular/core';
import {CrudListComponent} from '../util/component/crud.list.component';
import {Saida} from './saida';
import {SaidaService} from './saida.service';
import {SaidaItem} from './saidaItem';

@Component({
  selector: 'app-list-saida',
  templateUrl: './saida.list.component.html',
  styleUrls: ['./saida.list.component.css']
})
export class SaidaListComponent extends CrudListComponent<Saida, number> {

  constructor(protected saidaService: SaidaService,
              protected injector: Injector) {
    super(saidaService, injector, ['id', 'dtSaida', 'qtde', 'usuario', 'actions'], 'saida/form');
  }

  getQtdeTotal(saidaItem: SaidaItem[]) {
    return saidaItem.map(t => t.qtde).reduce((acc, value) => Number(acc) + Number(value), 0);
  }

}
