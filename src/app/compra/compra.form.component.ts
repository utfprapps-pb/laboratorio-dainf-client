import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {CrudFormComponent} from '../util/component/crud.form.component';
import {Compra} from './compra';
import {CompraService} from './compra.service';
import {Fornecedor} from '../fornecedor/fornecedor';
import {FornecedorService} from '../fornecedor/fornecedor.service';
import {NgForm} from '@angular/forms';
import {ItemService} from '../item/item.service';
import {Item} from '../item/item';
import {CompraItem} from './compraItem';

export interface Transaction {
  item: string;
  cost: number;
}

@Component({
  selector: 'app-form-compra',
  templateUrl: './compra.form.component.html',
  styleUrls: ['./compra.form.component.css']
})
export class CompraFormComponent extends CrudFormComponent<Compra, number> {

  displayedColumns = ['item', 'qtde', 'valor'];

  fornecedorList: Fornecedor[];
  itemList: Item[];
  valorIns: number;
  produtoIns: Item;
  quantidadeIns: number;
  compraItem: CompraItem;
  compraItemList: CompraItem[];

  @ViewChild('form', {static: true}) form: NgForm;

  constructor(protected compraService: CompraService,
              protected injector: Injector,
              private fornecedorService: FornecedorService,
              private itemService: ItemService) {
    super(compraService, injector, '/compra');
    this.compraItem = new CompraItem();
    this.compraItemList = new Array();
  }

  findFornecedores($event) {
    this.fornecedorService.complete($event.query)
      .subscribe(e => {
        this.fornecedorList = e;
      });
  }

  findProdutos($event) {
    this.itemService.complete($event.query)
      .subscribe(e => {
        this.itemList = e;
      });
  }

  getTotalCost() {
    return this.compraItemList.map(t => t.valor).reduce((acc, value) => acc + value, 0);
  }

  setPrecoProduto() {
    if (this.compraItem != null) {
      this.compraItem.valor = this.compraItem.item.valor;
    }
  }

  clerFieldsInsert() {
    this.produtoIns = null;
    this.valorIns = null;
    this.quantidadeIns = null;
  }

  insertItem() {
    this.compraItemList.push(this.compraItem);
    this.compraItem = new CompraItem();
    console.log(this.compraItemList);
    console.log(this.compraItem);
  }
}
