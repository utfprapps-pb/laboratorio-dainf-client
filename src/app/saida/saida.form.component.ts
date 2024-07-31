import {Component, ElementRef, Injector, ViewChild} from '@angular/core';
import {CrudFormComponent} from '../framework/component/crud.form.component';
import {Saida} from './saida';
import {SaidaService} from './saida.service';
import {Item} from '../item/item';
import {SaidaItem} from './saidaItem';
import {ItemService} from '../item/item.service';
import {UsuarioService} from '../usuario/usuario.service';
import {MatTable} from '@angular/material/table';
import {AutoComplete} from 'primeng/autocomplete';
import {pt} from '../framework/constantes/calendarPt';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-form-saida',
  templateUrl: './saida.form.component.html',
  styleUrls: ['./saida.form.component.css']
})
export class SaidaFormComponent extends CrudFormComponent<Saida, number> {

  datepipe: DatePipe = new DatePipe('pt-BR');
  itemList: Item[];
  saidaItem: SaidaItem;
  maxDate = new Date();
  displayedColumns = ['item', 'qtde', 'actionsForm'];
  @ViewChild('table') table: MatTable<any>;
  @ViewChild('itemToAdd') itemToAdd: AutoComplete;
  @ViewChild('qtdeToAdd') qtdeToAdd: ElementRef;
  localePt: any;

  constructor(protected saidaService: SaidaService,
              protected injector: Injector,
              private itemService: ItemService,
              private usuarioService: UsuarioService) {
    super(saidaService, injector, '/saida');
    this.saidaItem = new SaidaItem();
    this.localePt = pt;
  }

  initializeValues(): void {
    this.object.dataSaida = this.datepipe.transform(new Date().toLocaleDateString(), 'dd/MM/yyyy');
    this.setUsuarioResponsavel();
  }

  setFocusInputItem() {
    this.itemToAdd.focusInput();
  }

  setFocusQtdeToAdd() {
    this.qtdeToAdd.nativeElement.focus();
  }

  setQtdeDefaultItem() {
    this.saidaItem.qtde = 1;
  }

  setUsuarioResponsavel() {
    const username = localStorage.getItem('username');
    this.usuarioService.findByUsername(username)
      .subscribe(e => {
        this.object.usuarioResponsavel = e;
      });
  }

  findProdutos($event) {
    this.itemService.completeItem($event.query, true)
      .subscribe(e => {
        this.itemList = e;
      });
  }

  getQtdeTotal() {
    const valid = this?.object?.saidaItem;
    if (valid) {
      return this.object.saidaItem.map(t => t.qtde).reduce((acc, value) => Number(acc) + Number(value), 0);
    }
  }

  removeItem(id: number) {
    let index;
    this.object.saidaItem.forEach(saiItem => {
      if (saiItem.item.id === id) {
        index = this.object.saidaItem.indexOf(saiItem);
      }
    });
    this.object.saidaItem.splice(index, 1);
    this.table.renderRows();
  }

  insertItem() {
    if (this.saidaItem.item && this.saidaItem.qtde && typeof this.saidaItem.item === 'object') {
      if (this.saldoItemIsValid(this.saidaItem.qtde)) {
        if (!this.object.saidaItem) {
          this.object.saidaItem = new Array();
        }
        const upQtde = this.object.saidaItem.some(value => value.item.id === this.saidaItem.item.id);
        if (upQtde) {
          this.object.saidaItem.forEach(saiItem => {
            if (saiItem.item.id === this.saidaItem.item.id) {
              const novaQtde = Number(saiItem.qtde) + Number(this.saidaItem.qtde);
              if (this.saldoItemIsValid(novaQtde)) {
                saiItem.qtde = novaQtde;
              }
            }
          });
        } else {
          this.object.saidaItem.push(this.saidaItem);
        }
        this.postInsertItemList();
      }
    } else {
      this.messageService.add({severity: 'info', detail: 'Necessário informar o item e a quantidade.'});
    }
  }

  saldoItemIsValid(qtdeInserir) {
    const isValid = this.saidaItem.item.saldo > 0 && qtdeInserir <= this.saidaItem.item.saldo;
    if (!isValid) {
      this.messageService.add({severity: 'info', detail: 'A quantidade informada é maior do que o saldo atual do item.'});
      return false;
    }
    return true;
  }

  postInsertItemList() {
    this.saidaItem = new SaidaItem();
    this.setFocusInputItem();
    this.table.renderRows();
  }

  save() {
    if (!this.object.saidaItem || this.object.saidaItem.length <= 0) {
      this.validExtra = false;
    } else {
      this.validExtra = true;
    }
    super.save();
  }
}
