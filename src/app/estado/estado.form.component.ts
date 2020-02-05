import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Estado} from "./estado";
import {EstadoService} from "./estado.service";
import {NgForm} from "@angular/forms";
import {Pais} from "../pais/pais";

@Component({
  selector: 'app-form-estado',
  templateUrl: './estado.form.component.html',
  styleUrls: ['./estado.form.component.css']
})
export class EstadoFormComponent implements OnInit {

  estado: Estado;
  paisList: Pais[];
  @ViewChild('form', {static: true}) form: NgForm;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private estadoService: EstadoService) {
  }

  ngOnInit() {
    this.estado = new Estado();

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.estadoService.findOne(params['id'])
          .subscribe(e => {
            this.estado = e;
          });
      }
    });
  }

  save() {
    this.estadoService.save(this.estado)
      .subscribe(e => {
        this.estado = e;
        this.back();
      });
  }

  findPaises($event) {

  }

  back() {
    this.router.navigate(['estado/form']);
  }
}
