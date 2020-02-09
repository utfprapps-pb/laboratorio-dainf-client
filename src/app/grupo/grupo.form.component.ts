import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {Grupo} from './grupo';
import {GrupoService} from './grupo.service';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CrudFormComponent} from '../util/component/crud.form.component';

@Component({
  selector: 'app-form-grupo',
  templateUrl: './grupo.form.component.html',
  styleUrls: ['./grupo.form.component.css']
})
export class GrupoFormComponent extends CrudFormComponent<Grupo, number> {

  // grupo: Grupo;
  @ViewChild('form', {static: true}) form: NgForm;

  constructor(protected grupoService: GrupoService,
              protected injector: Injector) {
    super(grupoService, injector, '/grupo');
  }
  //
  // ngOnInit() {
  //   this.grupo = new Grupo();
  //
  //   this.route.params.subscribe(params => {
  //     if (params['id']) {
  //       this.grupoService.findOne(params['id'])
  //         .subscribe(e => {
  //           this.grupo = e;
  //         });
  //     }
  //   });
  // }
  //
  // save() {
  //   this.grupoService.save(this.grupo)
  //     .subscribe(e => {
  //       this.grupo = e;
  //       this.back();
  //     });
  // }
  //
  // back() {
  //   this.router.navigate(['/grupo']);
  // }

}
