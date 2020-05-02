import {Component, Injector} from '@angular/core';
import {Estado} from './estado';
import {EstadoService} from './estado.service';
import {CrudListComponent} from '../framework/component/crud.list.component';

@Component({
  selector: 'app-list-estado',
  templateUrl: './estado.list.component.html',
  styleUrls: ['./estado.list.component.css']
})
export class EstadoListComponent extends CrudListComponent<Estado, number> {

  constructor(protected estadoService: EstadoService,
              protected injector: Injector) {
    super(estadoService, injector, ['id', 'nome', 'uf', 'pais'], 'estado/form');
  }
}
