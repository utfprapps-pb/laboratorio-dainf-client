import {Component, Injector} from '@angular/core';
import {CrudListComponent} from '../framework/component/crud.list.component';
import {Relatorio} from './relatorio';
import {RelatorioService} from './relatorio.service';

@Component({
  selector: 'app-list-relatorio',
  templateUrl: './relatorio.list.component.html',
  styleUrls: ['./relatorio.list.component.css']
})
export class RelatorioListComponent extends CrudListComponent<Relatorio, number> {

  constructor(protected relatorioService: RelatorioService,
              protected injector: Injector) {
    super(relatorioService, injector, ['id', 'nome', 'actions'], 'relatorio/form');
  }

  generateReport(id) {
    this.loaderService.display(true);
    this.router.navigate(['relatorio/view', id])
  }
}
