import {Component, Injector, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {CrudFormComponent} from '../framework/component/crud.form.component';
import {Item} from './item';
import {ItemService} from './item.service';
import {Grupo} from '../grupo/grupo';
import {GrupoService} from '../grupo/grupo.service';
import {SelectItem} from 'primeng';

@Component({
  selector: 'app-form-item',
  templateUrl: './item.form.component.html',
  styleUrls: ['./item.form.component.css']
})
export class ItemFormComponent extends CrudFormComponent<Item, number> {

  grupoList: Grupo[];
  yesNoDropdown: SelectItem[];

  @ViewChild('form', {static: true}) form: NgForm;

  constructor(protected itemService: ItemService,
              protected injector: Injector,
              private grupoService: GrupoService) {
    super(itemService, injector, '/item');

    this.yesNoDropdown = [
      {label: 'Sim', value: true},
      {label: 'Não', value: false}
    ];
  }

  initializeValues(): void {
    this.object.devolver = this.yesNoDropdown[0].value;
  }

  findGrupos($event) {
    this.grupoService.complete($event.query)
      .subscribe(e => {
        this.grupoList = e;
      });
  }

}
