import {Component, Injector, ViewChild} from '@angular/core';
import {Estado} from './estado';
import {EstadoService} from './estado.service';
import {NgForm} from '@angular/forms';
import {Pais} from '../pais/pais';
import {CrudFormComponent} from '../util/component/crud.form.component';
import {PaisService} from '../pais/pais.service';

@Component({
  selector: 'app-form-estado',
  templateUrl: './estado.form.component.html',
  styleUrls: ['./estado.form.component.css']
})
export class EstadoFormComponent extends CrudFormComponent<Estado, number> {

  paisList: Pais[];
  @ViewChild('form', {static: true}) form: NgForm;

  constructor(protected estadoService: EstadoService,
              protected injector: Injector,
              private paisService: PaisService) {
    super(estadoService, injector, 'estado/form');
  }

  findPaises($event) {
    this.paisService.complete($event.query)
      .subscribe(e => {
        this.paisList = e;
      });
  }
}
