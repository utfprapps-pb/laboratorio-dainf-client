import {Component, Injector} from '@angular/core';
import {CrudListComponent} from '../framework/component/crud.list.component';
import {SolicitacaoCompra} from './solicitacaoCompra';
import {SolicitacaoCompraService} from './solicitacaoCompra.service';

@Component({
  selector: 'app-list-solicitacao-compra',
  templateUrl: './solicitacaoCompra.list.component.html',
  styleUrls: ['./solicitacaoCompra.list.component.css']
})
export class SolicitacaoCompraListComponent extends CrudListComponent<SolicitacaoCompra, number> {

  constructor(protected solicitacaoCompraService: SolicitacaoCompraService,
              protected injector: Injector) {
    super(solicitacaoCompraService, injector,
      ['id', 'descricao', 'dataSolicitacao', 'usuario', 'actions'], 'solicitacao-compra/form');
  }

}
