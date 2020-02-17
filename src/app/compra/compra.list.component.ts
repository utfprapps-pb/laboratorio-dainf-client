import {Component, Injector} from '@angular/core';
import {CrudListComponent} from '../util/component/crud.list.component';
import {Compra} from './compra';
import {CompraService} from './compra.service';

@Component({
  selector: 'app-list-compra',
  templateUrl: './compra.list.component.html',
  styleUrls: ['./compra.list.component.css']
})
export class CompraListComponent extends CrudListComponent<Compra, number> {

  constructor(protected compraService: CompraService,
              protected injector: Injector) {
    super(compraService, injector, ['id', 'fornecedor', 'dataCompra', 'actions'], 'compra/form');
  }
}
