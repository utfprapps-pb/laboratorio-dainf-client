import {Component, OnInit, ViewChild} from '@angular/core';
import {Grupo} from './grupo';
import {GrupoService} from './grupo.service';
import {NgForm} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-form-grupo',
  templateUrl: './grupo.form.component.html',
  styleUrls: ['./grupo.form.component.css']
})
export class GrupoFormComponent implements OnInit {

  grupo: Grupo;
  @ViewChild('form') form: NgForm;

  constructor(private grupoService: GrupoService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.grupo = new Grupo();

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.grupoService.findOne(params['id'])
          .subscribe(e => {
            this.grupo = e;
          });
      }
    });
  }

  save() {
    this.grupoService.save(this.grupo)
      .subscribe(e => {
        this.grupo = e;
        this.back();
      });
  }

  back() {
    window.history.back();
  }


}
