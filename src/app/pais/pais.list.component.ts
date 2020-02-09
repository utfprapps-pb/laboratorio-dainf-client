import {Component, Injector} from '@angular/core';
import {Pais} from './pais';
import {PaisService} from './pais.service';
import {CrudListComponent} from '../util/component/crud.list.component';

@Component({
  selector: 'app-list-pais',
  templateUrl: './pais.list.component.html',
  styleUrls: ['./pais.list.component.css']
})
export class PaisListComponent extends CrudListComponent<Pais, number> {

  constructor(protected paisService: PaisService,
              protected injector: Injector) {
    super(paisService, injector, ['id', 'nome', 'sigla'], 'pais/form');
  }
}
