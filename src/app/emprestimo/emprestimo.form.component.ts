import {Component, Injector, ViewChild} from '@angular/core';
import {CrudFormComponent} from '../util/component/crud.form.component';
import {Emprestimo} from './emprestimo';
import {EmprestimoService} from './emprestimo.service';
import {EmprestimoItem} from './emprestimoItem';
import {Item} from '../item/item';
import {ItemService} from '../item/item.service';
import {UsuarioService} from '../usuario/usuario.service';
import {Usuario} from '../usuario/usuario';
import {MatTable} from '@angular/material/table';
import {NgForm} from '@angular/forms';
import {SelectItem} from 'primeng';

@Component({
  selector: 'app-form--emprestimo',
  templateUrl: './emprestimo.form.component.html',
  styleUrls: ['./emprestimo.form.component.css']
})
export class EmprestimoFormComponent extends CrudFormComponent<Emprestimo, number> {

  displayedColumns = ['item', 'devolver', 'qtde', 'actionsForm'];
  emprestimoItem: EmprestimoItem;
  itemList: Item[];
  usuarioList: Usuario[];
  itemDevolver: any;
  @ViewChild('form', {static: true}) form: NgForm;
  @ViewChild('table') table: MatTable<any>;
  yesNoDropdown: SelectItem[];

  constructor(protected emprestimoService: EmprestimoService,
              protected injector: Injector,
              private itemService: ItemService,
              private usuarioService: UsuarioService) {
    super(emprestimoService, injector, '/emprestimo');
    this.emprestimoItem = new EmprestimoItem();
    this.yesNoDropdown = [
      {label: 'Sim', value: true},
      {label: 'Não', value: false}
    ];
    if (!this.editando) {
      this.setUsuarioResponsavel();
    }
  }

  setUsuarioResponsavel() {
    const username = localStorage.getItem('username');
    this.usuarioService.findByUsername(username)
      .subscribe(e => {
        this.object.usuarioResponsavel = e;
      });
  }

  findProdutos($event) {
    this.itemService.complete($event.query)
      .subscribe(e => {
        this.itemList = e;
      });
  }

  findUsuarios($event) {
    this.usuarioService.complete($event.query)
      .subscribe(e => {
        this.usuarioList = e;
        }
      );
  }

  insertItem() {
    if (!this.object.emprestimoItem) {
      this.object.emprestimoItem = new Array();
    }
    const upQtde = this.object.emprestimoItem.some(value => value.item.id === this.emprestimoItem.item.id);
    if (upQtde) {
      this.object.emprestimoItem.forEach(empItem => {
        if (empItem.item.id === this.emprestimoItem.item.id) {
          empItem.qtde = Number(empItem.qtde) + Number(this.emprestimoItem.qtde);
        }
      });
    } else {
      this.object.emprestimoItem.push(this.emprestimoItem);
    }
    this.emprestimoItem = new EmprestimoItem();
    this.table.renderRows();
  }

  removeItem(id: number) {
    let index;
    this.object.emprestimoItem.forEach(empItem => {
      if (empItem.item.id === id) {
        index = this.object.emprestimoItem.indexOf(empItem);
      }
    });
    this.object.emprestimoItem.splice(index, 1);
    this.table.renderRows();
  }

  getQtdeTotal() {
    const valid = this?.object?.emprestimoItem;
    if (valid) {
      return this.object.emprestimoItem.map(t => t.qtde).reduce((acc, value) => Number(acc) + Number(value), 0);
    }
  }

  setDevolucaoItem() {
    if (this.emprestimoItem.item != null) {
      this.itemDevolver = this.emprestimoItem.item.devolver;
    }
  }
}
