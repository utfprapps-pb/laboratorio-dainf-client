import {Component, Injector, ViewChild} from '@angular/core';
import {CrudListComponent} from '../framework/component/crud.list.component';
import {Emprestimo} from './emprestimo';
import {EmprestimoService} from './emprestimo.service';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {BottomSheetEmprestimoComponent} from './bottomScheetEmprestimo/bottomSheetEmprestimo.component';
import {Calendar, SelectItem} from 'primeng';
import {DateUtil} from '../framework/util/dateUtil';
import {pt} from '../framework/constantes/calendarPt';
import {EmprestimoFilter} from './emprestimo.filter';
import {Usuario} from '../usuario/usuario';
import {UsuarioService} from '../usuario/usuario.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-list-emprestimo',
  templateUrl: './emprestimo.list.component.html',
  styleUrls: ['./emprestimo.list.component.css']
})
export class EmprestimoListComponent extends CrudListComponent<Emprestimo, number> {

  @ViewChild('novaData') novaData: Calendar;
  dialogFiltroEmprestimo = false;
  emprestimoFilter: EmprestimoFilter;
  isAlunoOrProfessor = false;
  statusDropdown: SelectItem[];
  localePt = pt;
  usuarioEmprestimoList: Usuario[];
  usuarioResponsalvel: Usuario[];

  constructor(protected emprestimoService: EmprestimoService,
              protected injector: Injector,
              private bottomSheetOptions: MatBottomSheet,
              private usuarioService: UsuarioService) {
    super(emprestimoService, injector, ['id', 'usuarioEmprestimo', 'dataEmprestimo', 'prazoDevolucao', 'status'], 'emprestimo/form');
    this.bottomSheetEnabled = false;
    this.hostListenerColumnEnable = false;
    this.emprestimoFilter = new EmprestimoFilter();
    this.buildDropdown();
  }

  buildDropdown() {
    this.statusDropdown = [
      {label: 'Todos', value: 'T'},
      {label: 'Em andamento', value: 'P'},
      {label: 'Em atraso', value: 'A'},
      {label: 'Finalizado', value: 'F'}
    ];
    this.emprestimoFilter.status = 'T';
  }

  postFindAll(): void {
    if (this.dataSource != null) {
      this.dataSource.sortingDataAccessor = (data, sortHeaderId) => {
        switch (sortHeaderId) {
          case 'usuarioEmprestimo':
            return data.usuarioEmprestimo.nome;
          case 'status':
            return data.prazoDevolucao;
          default:
            return data[sortHeaderId];
        }
      };
    }
    const u = localStorage.getItem('username');
    this.emprestimoService.findAllByUsuarioEmprestimo(u)
      .subscribe(e => {
        console.log(e);
      });
    this.loginService.userLoggedIsAlunoOrProfessor().then(value => this.isAlunoOrProfessor = value);
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

  openDialogFiltro() {
    this.dialogFiltroEmprestimo = true;
  }

  findUsuarios($event: any) {
    this.usuarioService.completeCustom($event.query)
      .subscribe(e => {
        this.usuarioEmprestimoList = e;
      });
  }

  findUsuarioResponsavel($event: any) {
    this.usuarioService.completeCustomUsersLab($event.query)
      .subscribe(e => {
        this.usuarioResponsalvel = e;
      });
  }

  clearFilter() {
    this.emprestimoFilter = new EmprestimoFilter();
    this.findAll();
  }

  filter() {
    console.log(this.emprestimoFilter);
    this.emprestimoService.filter(this.emprestimoFilter)
      .subscribe(e => {
        this.objects = e;
        this.dataSource = new MatTableDataSource(e);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dialogFiltroEmprestimo = false;
      });
  }
}
