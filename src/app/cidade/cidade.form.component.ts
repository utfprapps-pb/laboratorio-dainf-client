import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {CrudFormComponent} from "../util/component/crud.form.component";
import {Cidade} from "./cidade";
import {CidadeService} from "./cidade.service";
import {NgForm} from "@angular/forms";
import {Estado} from "../estado/estado";

@Component({
  selector: 'app-form-cidade',
  templateUrl: './cidade.form.component.html',
  styleUrls: ['./cidade.form.component.css']
})
export class CidadeFormComponent extends CrudFormComponent<Cidade, number>{

  estadosList: Estado[];

  @ViewChild('form', {static: true}) form: NgForm;

  constructor(protected cidadeService: CidadeService,
              protected injector: Injector) {
    super(cidadeService, injector, '/cidade');
  }

  findEstados($event) {
  }
}
