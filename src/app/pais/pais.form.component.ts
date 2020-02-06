import {Component, Injector, ViewChild} from '@angular/core';
import {Pais} from "./pais";
import {PaisService} from "./pais.service";
import {NgForm} from "@angular/forms";
import {CrudFormComponent} from "../util/component/crud.form.component";

@Component({
  selector: 'app-form-pais',
  templateUrl: './pais.form.component.html',
  styleUrls: ['./pais.form.component.css']
})
export class PaisFormComponent extends CrudFormComponent<Pais, number> {

  // pais: Pais;
  @ViewChild('form', {static: true}) form: NgForm;

  constructor(protected paisService: PaisService,
              protected injector: Injector) {
    super(paisService, injector, '/pais');
  }

  // constructor(private router: Router,
  //             private route: ActivatedRoute,
  //             private paisService: PaisService) {
  // }
  //
  // ngOnInit() {
  //   this.pais = new Pais();
  //
  //   this.route.params.subscribe(params => {
  //     if (params['id']) {
  //       this.paisService.findOne(params['id'])
  //         .subscribe(e => {
  //           this.pais = e;
  //         });
  //     }
  //   });
  // }
  //
  // back() {
  //   this.router.navigate(['/pais']);
  // }
  //
  // save() {
  //   this.paisService.save(this.pais)
  //     .subscribe(e => {
  //       this.pais = e;
  //       this.back();
  //     });
  // }

}
