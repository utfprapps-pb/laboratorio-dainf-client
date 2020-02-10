import {Component, Injector} from '@angular/core';
import {CrudListComponent} from '../util/component/crud.list.component';
import {Fornecedor} from './fornecedor';
import {FornecedorService} from './fornecedor.service';

@Component({
  selector: 'app-list-fornecedor',
  templateUrl: './fornecedor.list.component.html',
  styleUrls: ['./fornecedor.list.component.css']
})
export class FornecedorListComponent extends CrudListComponent<Fornecedor, number> {

  constructor(protected fornecedorService: FornecedorService,
              protected injector: Injector) {
    super(fornecedorService, injector, ['id', 'razaoSocial', 'nomeFantasia', 'cnpj'], 'fornecedor/form');
  }
}
