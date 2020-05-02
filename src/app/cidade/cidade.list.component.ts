import {Component, Injector} from '@angular/core';
import {CidadeService} from './cidade.service';
import {Cidade} from './cidade';
import {CrudListComponent} from '../framework/component/crud.list.component';

@Component({
  selector: 'app-list-cidade',
  templateUrl: './cidade.list.component.html',
  styleUrls: ['./cidade.list.component.css']
})
export class CidadeListComponent extends CrudListComponent<Cidade, number> {

  constructor(protected cidadeService: CidadeService,
              protected injector: Injector) {
    super(cidadeService, injector, ['id', 'nome', 'estado'], 'cidade/form');
  }
}
