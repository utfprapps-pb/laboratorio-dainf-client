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

@Component({
  selector: 'app-list-emprestimo',
  templateUrl: './emprestimo.list.component.html',
  styleUrls: ['./emprestimo.list.component.css']
})
export class EmprestimoListComponent extends CrudListComponent<Emprestimo, number> {

  @ViewChild('novaData') novaData: Calendar;
  dialogFiltroEmprestimo = false;
  emprestimoFilter: EmprestimoFilter;
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

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {
    this.loginService.userLoggedIsAlunoOrProfessor().then(value => {
      this.isAlunoOrProfessor = value;
      this.isAlunoOrProfessor ? this.findAllByUsername() : this.findAll();
    });
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
      this.dataSource.filterPredicate = (data, filter1) => {
        switch (filter1) {
          case 'usuarioEmprestimo':
            return data.usuarioEmprestimo.nome;
          default:
            return data[filter1];
        }
      };
    }
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
    this.isAlunoOrProfessor ? this.findAllCustom() : this.findAll();
  }

  filter() {
    this.dialogFiltroEmprestimo = false;
    this.loaderService.display(true);
    if (this.isAlunoOrProfessor) {
      this.setUserLogadoInFilter().then(() => {
        this.findByFilter();
      });
    } else {
      this.findByFilter();
    }
  }

  findByFilter() {
    this.emprestimoService.filter(this.emprestimoFilter)
      .subscribe(e => {
        this.objects = e;
        this.buildList();
        this.loaderService.display(false);
      }, error => {
        this.loaderService.display(false);
      });
  }

  setUserLogadoInFilter(): Promise<void> {
    return new Promise<void>(resolve => {
      const u = new Usuario();
      u.username = localStorage.getItem('username');
      this.emprestimoFilter.usuarioEmprestimo = u;
      resolve();
    });
  }
}
