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

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {
    this.loginService.userLoggedIsAlunoOrProfessor().then(value => {
      this.isAlunoOrProfessor = value;
      this.isAlunoOrProfessor ? this.findAllByUsername() : this.findAll();
    });
  }

  postFindAll(): void {
    if (this.dataSource != null) {
      this.dataSource.sortingDataAccessor = (data, sortHeaderId) => {
        switch (sortHeaderId) {
          case 'usuario':
            return data.usuario.nome;
          default:
            return data[sortHeaderId];
        }
      };
    }
  }

}
