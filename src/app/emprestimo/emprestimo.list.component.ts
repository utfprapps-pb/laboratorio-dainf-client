import {Component, Injector, ViewChild} from '@angular/core';
import {CrudListComponent} from '../framework/component/crud.list.component';
import {Emprestimo} from './emprestimo';
import {EmprestimoService} from './emprestimo.service';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {BottomSheetEmprestimoComponent} from './bottomScheetEmprestimo/bottomSheetEmprestimo.component';
import {Calendar} from 'primeng';
import {DateUtil} from '../framework/util/dateUtil';

@Component({
  selector: 'app-list-emprestimo',
  templateUrl: './emprestimo.list.component.html',
  styleUrls: ['./emprestimo.list.component.css']
})
export class EmprestimoListComponent extends CrudListComponent<Emprestimo, number> {

  @ViewChild('novaData') novaData: Calendar;

  constructor(protected emprestimoService: EmprestimoService,
              protected injector: Injector,
              private bottomSheetOptions: MatBottomSheet) {
    super(emprestimoService, injector, ['id', 'usuarioEmprestimo', 'dataEmprestimo', 'prazoDevolucao', 'status'], 'emprestimo/form');
    this.bottomSheetEnabled = false;
    this.hostListenerColumnEnable = false;
  }

  openOptions(id): void {
    const sheet = this.bottomSheetOptions.open(BottomSheetEmprestimoComponent);
    sheet.afterDismissed().subscribe(action => {
      if (action === 'E') {
        this.edit(id);
      } else if (action === 'R') {
        this.delete(id);
      } else if (action === 'P') {
        this.openCalendarNewDate();
      } else if (action === 'D') {
        this.openDevolucao(id);
      }
    });
  }

  openDevolucao(id) {
    this.router.navigate(['emprestimo/devolucao', id]);
  }

  openCalendarNewDate() {
    this.novaData.overlayVisible = true;
  }

  getStatusEmprestimo(emprestimo: Emprestimo) {
    if (DateUtil.dtIsBeforeToday(emprestimo.prazoDevolucao) && emprestimo.dataDevolucao == null) {
      return 'A';
    } else if (emprestimo.dataDevolucao == null) {
      return 'P';
    } else {
      return 'F';
    }
  }
}
