import {Component, Injector} from '@angular/core';
import {Grupo} from './grupo';
import {GrupoService} from './grupo.service';
import {CrudListComponent} from '../util/component/crud.list.component';

@Component({
  selector: 'app-list-grupo',
  templateUrl: './grupo.list.component.html',
  styleUrls: ['./grupo.list.component.css']
})
export class GrupoListComponent extends CrudListComponent<Grupo, number> {

  constructor(protected grupoService: GrupoService,
              protected injector: Injector) {
    super(grupoService, injector, ['id', 'descricao'], 'grupo/form');
  }
}
