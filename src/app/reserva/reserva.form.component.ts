import {Component, ElementRef, Injector, ViewChild} from '@angular/core';
import {CrudFormComponent} from '../framework/component/crud.form.component';
import {Reserva} from './reserva';
import {ReservaService} from './reserva.service';
import {ReservaItem} from './reservaItem';
import {MatTable} from '@angular/material/table';
import {AutoComplete} from 'primeng';
import {Item} from '../item/item';
import {ItemService} from '../item/item.service';
import {UsuarioService} from '../usuario/usuario.service';
import {pt} from '../framework/constantes/calendarPt';

@Component({
  selector: 'app-form-reserva',
  templateUrl: './reserva.form.component.html',
  styleUrls: ['./reserva.form.component.css']
})
export class ReservaFormComponent extends CrudFormComponent<Reserva, number> {

  @ViewChild('table') table: MatTable<any>;
  @ViewChild('itemToAdd') itemToAdd: AutoComplete;
  @ViewChild('qtdeToAdd') qtdeToAdd: ElementRef;
  displayedColumns = ['item', 'qtde', 'actionsForm'];
  reservaItem: ReservaItem;
  itemList: Item[];
  localePt: any;

  constructor(protected reservaService: ReservaService,
              protected injector: Injector,
              private itemService: ItemService,
              private usuarioService: UsuarioService) {
    super(reservaService, injector, '/reserva');
    this.reservaItem = new ReservaItem();
    this.localePt = pt;
  }

  initializeValues(): void {
    this.object.dataReserva = new Date().toLocaleDateString();
    this.setUsuarioResponsavel();
  }

  setUsuarioResponsavel() {
    const username = localStorage.getItem('username');
    this.usuarioService.findByUsername(username)
      .subscribe(e => {
        this.object.usuario = e;
        console.log(e);
      });
  }

  findProdutos($event) {
    this.itemService.completeItem($event.query, true)
      .subscribe(e => {
        this.itemList = e;
      });
  }

  removeItem(id: number) {
    let index;
    this.object.reservaItem.forEach(empItem => {
      if (empItem.item.id === id) {
        index = this.object.reservaItem.indexOf(empItem);
      }
    });
    this.object.reservaItem.splice(index, 1);
    this.table.renderRows();
  }

  getQtdeTotal() {
    const valid = this?.object?.reservaItem;
    if (valid) {
      return this.object.reservaItem.map(t => t.qtde).reduce((acc, value) => Number(acc) + Number(value), 0);
    }
  }

  insertItem() {
    if (this.reservaItem.item && this.reservaItem.qtde) {
      if (this.saldoItemIsValid(this.reservaItem.qtde)) {
        if (!this.object.reservaItem) {
          this.object.reservaItem = new Array();
        }
        const upQtde = this.object.reservaItem.some(value => value.item.id === this.reservaItem.item.id);
        if (upQtde) {
          this.object.reservaItem.forEach(empItem => {
            if (empItem.item.id === this.reservaItem.item.id) {
              const novaQtde = Number(empItem.qtde) + Number(this.reservaItem.qtde);
              if (this.saldoItemIsValid(novaQtde)) {
                empItem.qtde = novaQtde;
              }
            }
          });
        } else {
          this.object.reservaItem.push(this.reservaItem);
        }
        this.postInsertItemList();
      }
    } else {
      this.messageService.add({severity: 'info', detail: 'Necessário informar o item e a quantidade.'});
    }
  }

  postInsertItemList() {
    this.reservaItem = new ReservaItem();
    this.setFocusInputItem();
    this.table.renderRows();
  }

  setFocusInputItem() {
    this.itemToAdd.focusInput();
  }

  saldoItemIsValid(qtdeInserir) {
    const isValid = this.reservaItem.item.saldo > 0 && qtdeInserir <= this.reservaItem.item.saldo;
    if (!isValid) {
      this.messageService.add({severity: 'info', detail: 'A quantidade é maior do que o saldo atual do item.'});
      return false;
    }
    return true;
  }

  save() {
    if (!this.object.reservaItem || this.object.reservaItem.length <= 0) {
      this.validExtra = false;
    } else {
      this.validExtra = true;
    }
    super.save();
  }
}
