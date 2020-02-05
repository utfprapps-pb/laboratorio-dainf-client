import {Component, OnInit, ViewChild} from '@angular/core';
import {Usuario} from "./usuario";
import {ActivatedRoute, Router} from "@angular/router";
import {UsuarioService} from "./usuario.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-form-usuario',
  templateUrl: './usuario.form.component.html',
  styleUrls: ['./usuario.form.component.css']
})
export class UsuarioFormComponent implements OnInit {

  usuario: Usuario;
  @ViewChild('form', {static: true}) form: NgForm;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private usuarioService: UsuarioService) {
  }

  ngOnInit() {
    this.usuario = new Usuario();

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.usuarioService.findOne(params['id'])
          .subscribe(e => {
            this.usuario = e;
          });
      }
    });
  }

  save() {
    this.usuarioService.save(this.usuario)
      .subscribe(e => {
        this.usuario = e;
        this.back();
      });
  }

  back() {
    this.router.navigate(['/usuario']);
  }
}
