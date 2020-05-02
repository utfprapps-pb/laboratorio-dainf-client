import {Component, Injector} from '@angular/core';
import {Grupo} from './grupo';
import {GrupoService} from './grupo.service';
import {CrudFormComponent} from '../framework/component/crud.form.component';
import {Item} from '../item/item';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-grupo',
  templateUrl: './grupo.form.component.html',
  styleUrls: ['./grupo.form.component.css']
})
export class GrupoFormComponent extends CrudFormComponent<Grupo, number> {

  dialogItensRelacionados = false;
  itensVinculados: Item[];
  displayedColumns = ['id', 'nome'];

  constructor(protected grupoService: GrupoService,
              protected injector: Injector) {
    super(grupoService, injector, '/grupo');
  }

  showDialogItensVinculados() {
    this.findItensVinculados();
  }

  findItensVinculados() {
    this.grupoService.findItensVinculados(this.object.id)
      .subscribe(e => {
        if (e.length === 0) {
          Swal.fire('Ops...', 'Não existe nenhum item vinculado ao grupo.', 'info');
        } else {
          this.itensVinculados = e;
          this.dialogItensRelacionados = true;
        }
      });
  }
}
