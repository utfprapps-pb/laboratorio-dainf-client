import {Component, ElementRef, Injector, ViewChild} from '@angular/core';
import {CrudFormComponent} from '../framework/component/crud.form.component';
import {Emprestimo} from './emprestimo';
import {EmprestimoService} from './emprestimo.service';
import {EmprestimoItem} from './emprestimoItem';
import {Item} from '../item/item';
import {ItemService} from '../item/item.service';
import {UsuarioService} from '../usuario/usuario.service';
import {Usuario} from '../usuario/usuario';
import {MatTable} from '@angular/material/table';
import {AutoComplete} from 'primeng/autocomplete';
import {SelectItem} from 'primeng/api';
import {NgForm} from '@angular/forms';
import {DateUtil} from '../framework/util/dateUtil';
import {pt} from '../framework/constantes/calendarPt';
import Swal from "sweetalert2";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-form-emprestimo',
  templateUrl: './emprestimo.form.component.html',
  styleUrls: ['./emprestimo.form.component.css']
})
export class EmprestimoFormComponent extends CrudFormComponent<Emprestimo, number> {

  @ViewChild('form') form: NgForm;
  @ViewChild('table') table: MatTable<any>;
  @ViewChild('itemToAdd') itemToAdd: ElementRef;
  @ViewChild('qtdeToAdd') qtdeToAdd: ElementRef;

  datepipe: DatePipe = new DatePipe('pt-BR');
  idReserva = 0;
  displayedColumns = ['item', 'devolver', 'qtde', 'actionsForm'];
  emprestimoItem: EmprestimoItem;
  itemList: Item[];
  usuarioList: Usuario[];
  itemDevolver: any;
  maxDateEmprestimo = new Date();
  minDatePrazoDevolucao: Date;
  yesNoDropdown: SelectItem[];
  documentoUsuario: string;
  disableForm = false;
  localePt: any;

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
    this.localePt = pt;
  }

  initializeValues(): void {
    this.object.usuarioResponsavel = new Usuario();
    this.object.dataEmprestimo = this.datepipe.transform(new Date().toLocaleDateString(), 'dd/MM/yyyy');
    this.setDateMinPrazoDevolucao();
    this.setUsuarioResponsavel();
    if (window.location.href.includes('reserva')) {
      this.generateEmprestimoByReserva();
    }
  }


  postEdit(): void {
    this.documentoUsuario = this.object.usuarioEmprestimo.documento;
    this.verifyFormDisable();
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

  findUsuarios($event) {
    this.usuarioService.completeCustom($event.query)
      .subscribe(e => {
          this.usuarioList = e;
          if (this.usuarioList != null && this.usuarioList.length === 1) {
            this.object.usuarioEmprestimo = this.usuarioList[0];
          }
        }
      );
  }

  insertItem() {
    if (this.emprestimoItem.item && this.emprestimoItem.qtde && typeof this.emprestimoItem.item === 'object') {
      if (this.saldoItemIsValid(this.emprestimoItem.qtde)) {
        if (!this.object.emprestimoItem) {
          this.object.emprestimoItem = new Array();
        }
        const upQtde = this.object.emprestimoItem.some(value => value.item.id === this.emprestimoItem.item.id);
        if (upQtde) {
          this.object.emprestimoItem.forEach(empItem => {
            if (empItem.item.id === this.emprestimoItem.item.id) {
              const novaQtde = Number(empItem.qtde) + Number(this.emprestimoItem.qtde);
              if (this.saldoItemIsValid(novaQtde)) {
                empItem.qtde = novaQtde;
              }
            }
          });
        } else {
          this.object.emprestimoItem.push(this.emprestimoItem);
        }
        this.postInsertItemList();
      }
    } else {
      this.messageService.add({severity: 'info', detail: 'Necessário informar o item e a quantidade.'});
    }
  }

  saldoItemIsValid(qtdeInserir) {
    const isValid = this.emprestimoItem.item.saldo > 0 && qtdeInserir <= this.emprestimoItem.item.saldo;
    if (!isValid) {
      this.messageService.add({severity: 'info', detail: 'A quantidade é maior do que o saldo atual do item.'});
      return false;
    }
    return true;
  }

  postInsertItemList() {
    this.emprestimoItem = new EmprestimoItem();
    this.setFocusInputItem();
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
    if (this.emprestimoItem.item != null && typeof this.emprestimoItem.item === 'object') {
      if (this.emprestimoItem.item.tipoItem === 'C') {
        this.itemDevolver = true;
      } else {
        this.itemDevolver = false;
      }
      this.emprestimoItem.qtde = 1;
    }
  }

  setFocusInputItem() {
    this.itemToAdd.nativeElement.focus();
  }

  setFocusInputQtde() {
    this.qtdeToAdd.nativeElement.focus();
  }

  clearNewItem() {
    this.emprestimoItem.item = null;
    this.emprestimoItem.qtde = null;
  }

  setDateMinPrazoDevolucao() {
    this.minDatePrazoDevolucao = DateUtil.parseStringToDate(this.datepipe.transform(this.object.dataEmprestimo, 'MM/dd/yyyy'));
  }

  save() {
    this.loaderService.display(true);
    if (!this.object.emprestimoItem || this.object.emprestimoItem.length <= 0 || typeof this.object.usuarioEmprestimo !== 'object') {
      this.validExtra = false;
    } else {
      this.validExtra = true;
    }

    if (this.isValid() && this.validExtra) {
      this.emprestimoService.saveEmprestimo(this.object, this.idReserva)
        .subscribe(e => {
          this.object = e;
          this.postSave(value => {
            this.loaderService.display(false);
            Swal.fire('Sucesso!', 'Registro salvo com sucesso!', 'success');
            this.back();
          });
        }, error => {
          this.loaderService.display(false);
          Swal.fire('Atenção!', 'Ocorreu um erro ao salvar o registro!', 'error');
        });
    } else {
      this.loaderService.display(false);
      this.messageService.add({severity: 'info', summary: 'Atenção', detail: 'Necessário preencher todos os campos corretamente!'});
      this.validarFormulario();
    }
  }

  verifyFormDisable() {
    if (this.isAlunosOrProfessor || this.object.dataDevolucao) {
      this.disableForm = true;
    }
  }

  generateEmprestimoByReserva() {
    let reserva = JSON.parse(localStorage.getItem('reserva-to-emprestimo'));
    this.idReserva = reserva.id;
    this.object.usuarioEmprestimo = reserva.usuario;
    this.object.observacao = reserva.observacao;
    this.documentoUsuario = reserva.usuario.documento;
    this.object.emprestimoItem = new Array();
    reserva.reservaItem.forEach(reserva => {
      let emprestimoItem = new EmprestimoItem();
      emprestimoItem.item = reserva.item;
      emprestimoItem.qtde = reserva.qtde;
      this.object.emprestimoItem.push(emprestimoItem);
    });
    localStorage.removeItem('reserva-to-emprestimo');
  }
}
