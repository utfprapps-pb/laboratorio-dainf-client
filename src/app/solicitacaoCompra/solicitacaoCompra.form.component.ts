import {Component, ElementRef, Injector, ViewChild} from '@angular/core';
import {CrudFormComponent} from '../framework/component/crud.form.component';
import {SolicitacaoCompra} from './solicitacaoCompra';
import {SolicitacaoCompraService} from './solicitacaoCompra.service';
import {SolicitacaoCompraItem} from './solicitacaoCompraItem';
import {MatTable} from '@angular/material/table';
import {AutoComplete} from 'primeng/autocomplete';
import {ItemService} from '../item/item.service';
import {UsuarioService} from '../usuario/usuario.service';
import {Item} from '../item/item';
import {pt} from '../framework/constantes/calendarPt';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-form-solicitacao-compra',
  templateUrl: './solicitacaoCompra.form.component.html',
  styleUrls: ['./solicitacaoCompra.form.component.css']
})
export class SolicitacaoCompraFormComponent extends CrudFormComponent<SolicitacaoCompra, number> {

  @ViewChild('table') table: MatTable<any>;
  @ViewChild('itemToAdd') itemToAdd: ElementRef;
  @ViewChild('qtdeToAdd') qtdeToAdd: ElementRef;
  datepipe: DatePipe = new DatePipe('pt-BR');
  displayedColumns = ['item', 'qtde', 'actionsForm'];
  solicitacaoCompraItem: SolicitacaoCompraItem;
  itemList: Item[];
  localePt: any;

  constructor(protected solicitacaoCompraService: SolicitacaoCompraService,
              protected injector: Injector,
              private itemService: ItemService,
              private usuarioService: UsuarioService) {
    super(solicitacaoCompraService, injector, '/solicitacao-compra');
    this.localePt = pt;
    this.solicitacaoCompraItem = new SolicitacaoCompraItem();
  }

  initializeValues(): void {
    this.object.dataSolicitacao = this.datepipe.transform(new Date(), 'dd/MM/yyyy');
    this.setUsuarioResponsavel();
  }

  setUsuarioResponsavel() {
    const username = localStorage.getItem('username');
    this.usuarioService.findByUsername(username)
      .subscribe(e => {
        this.object.usuario = e;
      });
  }

  findProdutos($event) {
    this.itemService.completeItem($event.query, false)
      .subscribe(e => {
        this.itemList = e;
      });
  }

  removeItem(id: number) {
    let index;
    this.object.solicitacaoItem.forEach(empItem => {
      if (empItem.item.id === id) {
        index = this.object.solicitacaoItem.indexOf(empItem);
      }
    });
    this.object.solicitacaoItem.splice(index, 1);
    this.table.renderRows();
  }

  getQtdeTotal() {
    const valid = this?.object?.solicitacaoItem;
    if (valid) {
      return this.object.solicitacaoItem.map(t => t.qtde).reduce((acc, value) => Number(acc) + Number(value), 0);
    }
  }

  insertItem() {
    if (this.solicitacaoCompraItem.item && this.solicitacaoCompraItem.qtde) {
      if (!this.object.solicitacaoItem) {
        this.object.solicitacaoItem = new Array();
      }
      const upQtde = this.object.solicitacaoItem.some(value => value.item.id === this.solicitacaoCompraItem.item.id);
      if (upQtde) {
        this.object.solicitacaoItem.forEach(empItem => {
          if (empItem.item.id === this.solicitacaoCompraItem.item.id) {
            const novaQtde = Number(empItem.qtde) + Number(this.solicitacaoCompraItem.qtde);
            empItem.qtde = novaQtde;
          }
        });
      } else {
        this.object.solicitacaoItem.push(this.solicitacaoCompraItem);
      }
      this.postInsertItemList();
    } else {
      this.messageService.add({severity: 'info', detail: 'Necessário informar o item e a quantidade.'});
    }
  }

  postInsertItemList() {
    this.solicitacaoCompraItem = new SolicitacaoCompraItem();
    this.setFocusInputItem();
    this.table.renderRows();
  }

  setFocusInputItem() {
    // this.itemToAdd.focusInput();
    this.itemToAdd.nativeElement.focus();
  }

  setFocusQtdeToAdd() {
    this.qtdeToAdd.nativeElement.focus();
  }
}
