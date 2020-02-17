import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {CrudFormComponent} from '../util/component/crud.form.component';
import {Compra} from './compra';
import {CompraService} from './compra.service';
import {Fornecedor} from '../fornecedor/fornecedor';
import {FornecedorService} from '../fornecedor/fornecedor.service';
import {NgForm} from '@angular/forms';

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

  displayedColumns = ['item', 'cost'];
  transactions: Transaction[] = [
    {item: 'Beach ball', cost: 4},
    {item: 'Towel', cost: 5},
    {item: 'Frisbee', cost: 2},
    {item: 'Sunscreen', cost: 4},
    {item: 'Cooler', cost: 25},
    {item: 'Swim suit', cost: 15},
  ];
  fornecedorList: Fornecedor[];
  @ViewChild('form', {static: true}) form: NgForm;

  constructor(protected compraService: CompraService,
              protected injector: Injector,
              private fornecedorService: FornecedorService) {
    super(compraService, injector, '/compra');
  }

  findFornecedores($event) {
    this.fornecedorService.complete($event.query)
      .subscribe(e => {
        this.fornecedorList = e;
      });
  }

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.transactions.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }
}
