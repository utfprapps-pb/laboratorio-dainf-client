import {Component, Injector, ViewChild} from '@angular/core';
import {Fornecedor} from './fornecedor';
import {CrudFormComponent} from '../framework/component/crud.form.component';
import {FornecedorService} from './fornecedor.service';
import {NgForm} from '@angular/forms';
import {Estado} from '../estado/estado';
import {CidadeService} from '../cidade/cidade.service';
import {EstadoService} from '../estado/estado.service';
import {Cidade} from '../cidade/cidade';

@Component({
  selector: 'app-form-fornecedor',
  templateUrl: './fornecedor.form.component.html',
  styleUrls: ['./fornecedor.form.component.css']
})
export class FornecedorFormComponent extends CrudFormComponent<Fornecedor, number> {

  cidadeList: Cidade[];
  estadoList: Estado[];

  @ViewChild('form', {static: true}) form: NgForm;

  constructor(protected fornecedorService: FornecedorService,
              protected injector: Injector,
              private cidadeService: CidadeService,
              private estadoService: EstadoService) {
    super(fornecedorService, injector, 'fornecedor');
  }

  findCidadesByEstado($event) {
    this.cidadeService.completeByEstado($event.query, this.object.estado)
      .subscribe(e => {
        this.cidadeList = e;
      });
  }

  findEstados($event) {
    this.estadoService.complete($event.query)
      .subscribe(e => {
        this.estadoList = e;
      });
  }

}
