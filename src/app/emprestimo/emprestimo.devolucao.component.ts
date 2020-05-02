import {Component, Injector, ViewChild} from '@angular/core';
import {CrudFormComponent} from '../framework/component/crud.form.component';
import {Emprestimo} from './emprestimo';
import {EmprestimoService} from './emprestimo.service';
import {MatTable} from '@angular/material/table';
import {AutoComplete} from 'primeng';
import {NgForm} from '@angular/forms';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MatMenuTrigger} from '@angular/material/menu';
import {EmprestimoDevolucaoItem, StatusDevolucao} from './emprestimoDevolucaoItem';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-devolucao-emprestimo',
  templateUrl: './emprestimo.devolucao.component.html',
  styleUrls: ['./emprestimo.devolucao.component.css']
})
export class EmprestimoDevolucaoComponent extends CrudFormComponent<Emprestimo, number> {


  @ViewChild('form') form: NgForm;
  @ViewChild('table') table: MatTable<any>;
  @ViewChild('itemToAdd') itemToAdd: AutoComplete;
  @ViewChild(MatMenuTrigger)

  itensPendentes = [];
  itensDevolvidos = [];
  itensSaida = [];
  qtdeItemDuplicado: number;
  itemIsEditing: EmprestimoDevolucaoItem;
  dialogDuplicaItem = false;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = {x: '0px', y: '0px'};
  optionDuplicateDisable = false;
  optionRemoveDuplicateDisable = false;

  constructor(protected emprestimoService: EmprestimoService,
              protected injector: Injector) {
    super(emprestimoService, injector, '/emprestimo');
  }

  postEdit(): void {
    this.buildItensKanban();
  }

  buildItensKanban() {
    this.object.emprestimoDevolucaoItem.forEach(empDevItem => {
      switch (empDevItem.statusDevolucao) {
        case StatusDevolucao.P: {
          this.itensPendentes.push(empDevItem);
          console.log(this.itensPendentes);
          break;
        }
        case StatusDevolucao.D: {
          this.itensDevolvidos.push(empDevItem);
          break;
        }
        case StatusDevolucao.S:
          this.itensSaida.push(empDevItem);
          break;
      }
    });
  }

  getDocumentoUsuarioEmprestimo() {
    const userEmprestimo = this.object.usuarioEmprestimo;
    if (userEmprestimo.documento) {
      if (userEmprestimo.permissoes[0].nome === 'ROLE_ALUNO') {
        return `RA: ${userEmprestimo.documento}`;
      } else {
        return `SIAPE: ${userEmprestimo.documento}`;
      }
    }
  }

  saveDevolucao() {
    this.object.emprestimoDevolucaoItem.forEach(empDevItem => {
      this.itensPendentes.forEach(pendente => {
        if (empDevItem.id === pendente.id) {
          empDevItem.statusDevolucao = StatusDevolucao.P;
        }
      });
      this.itensDevolvidos.forEach(devolvido => {
        if (empDevItem.id === devolvido.id) {
          empDevItem.statusDevolucao = StatusDevolucao.D;
        }
      });
      this.itensSaida.forEach(saida => {
        if (empDevItem.id === saida.id) {
          empDevItem.statusDevolucao = StatusDevolucao.S;
        }
      });
    });
    this.emprestimoService.saveDevolucao(this.object)
      .subscribe(e => {
        Swal.fire('Sucesso!', 'Devolução efetuada com sucesso!', 'success');
        this.back();
      }, error => {
        Swal.fire('Atenção!', 'Ocorreu um erro ao salvar a devolução!', 'error');
      });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  duplicarItem() {
    if (!this.disableBtnSaveDuplicar()) {
      const itemDuplicado = JSON.parse(JSON.stringify(this.itemIsEditing));
      itemDuplicado.qtde = this.qtdeItemDuplicado;
      itemDuplicado.id = null;
      this.itensPendentes.push(itemDuplicado);
      this.object.emprestimoDevolucaoItem.push(itemDuplicado);
      this.itemIsEditing.qtde = this.itemIsEditing.qtde - this.qtdeItemDuplicado;
      this.dialogDuplicaItem = false;
    }
  }

  verificaOptionsEnabled(item: EmprestimoDevolucaoItem) {
    let count = 0;
    this.object.emprestimoDevolucaoItem.forEach(empDevItem => {
      if (empDevItem.item.id === item.item.id) {
        count++;
      }
    });
    if (count === 1) {
      this.optionDuplicateDisable = false;
      this.optionRemoveDuplicateDisable = true;
    } else {
      this.optionDuplicateDisable = true;
      this.optionRemoveDuplicateDisable = false;
    }
  }

  openDialogDuplicarItem(item: EmprestimoDevolucaoItem) {
    this.dialogDuplicaItem = true;
    this.itemIsEditing = item;
  }

  onContextMenu(event: MouseEvent, item: EmprestimoDevolucaoItem) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = {item};
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
    this.verificaOptionsEnabled(item);
  }

  onClickMenuDuplicateItem(item: EmprestimoDevolucaoItem) {
    this.openDialogDuplicarItem(item);
  }

  onClickMenuRemoveDuplicates(item: EmprestimoDevolucaoItem) {
    this.removeItensDuplicadosByItem(item);
  }

  // todo pendente para desenvolvimento
  removeItensDuplicadosByItem(item: EmprestimoDevolucaoItem) {
    let qtdeTotal;
    this.object.emprestimoDevolucaoItem.forEach(empDevItem => {
      if (empDevItem.item.id === item.item.id) {
        qtdeTotal = empDevItem.qtde;
      }
    });
    this.object.emprestimoDevolucaoItem.forEach(empDevItem => {
      if (empDevItem.item.id === item.item.id) {
        qtdeTotal = empDevItem.qtde;
      }
    });

  }

  disableBtnSaveDuplicar() {
    return this.qtdeItemDuplicado == null || this.qtdeItemDuplicado.toString() === ''
      || this.qtdeItemDuplicado >= this.itemIsEditing.qtde;
  }
}

