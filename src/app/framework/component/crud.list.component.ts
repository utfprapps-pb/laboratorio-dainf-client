import { HostListener, Injector, OnInit, ViewChild, Directive } from '@angular/core';
import {Router} from '@angular/router';
import {CrudService} from '../service/crud.service';
import {ConfirmationService} from 'primeng/api';
import {MessageService} from 'primeng/api';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {BottomSheetComponent} from '../../geral/bottomScheet/bottomSheet.component';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import Swal from 'sweetalert2';
import {Exception} from '../../exception/exception';
import {LoaderService} from '../loader/loader.service';
import {LoginService} from '../../login/login.service';

@Directive()
export abstract class CrudListComponent<T, ID> implements OnInit {

  protected router: Router;
  protected messageService: MessageService;
  protected confirmationService: ConfirmationService;
  protected bottom: MatBottomSheet;
  protected loaderService: LoaderService;
  protected loginService: LoginService;
  public displayedColumns: string[] = this.columnsTable;
  public dataSource: MatTableDataSource<T>;
  public bottomSheetEnabled = true;
  public hostListenerColumnEnable = true;
  public isAlunoOrProfessor = false;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  objects: T[];

  ngOnInit(): void {
    this.loginService.userLoggedIsAlunoOrProfessor()
      .then(value => this.isAlunoOrProfessor = value);
    this.findAll();
  }

  constructor(protected service: CrudService<T, ID>,
              protected injector: Injector,
              protected columnsTable: string[],
              protected urlForm: string) {
    this.router = this.injector.get(Router);
    this.messageService = this.injector.get(MessageService);
    this.confirmationService = this.injector.get(ConfirmationService);
    this.bottom = injector.get(MatBottomSheet);
    this.loaderService = injector.get(LoaderService);
    this.loginService = injector.get(LoginService);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  findAllCustom(): void {
  }

  findAll() {
    this.loaderService.display(true);
    this.service.findAll()
      .subscribe(e => {
        this.objects = e;
        this.buildList();
        this.loaderService.display(false);
        this.postFindAll();
      }, error => {
        this.loaderService.display(false);
      });
    this.buildColumnsTable();
  }

  findAllByUsername() {
    this.loaderService.display(true);
    const u = localStorage.getItem('username');
    this.service.findAllByUsername(u)
      .subscribe(e => {
        this.objects = e;
        this.buildList();
        this.loaderService.display(false);
        this.postFindAll();
      }, error => {
        this.loaderService.display(false);
      });
  }

  buildList() {
    if (this.objects != null) {
      this.dataSource = new MatTableDataSource(this.objects);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  edit(id: number) {
    this.router.navigate([this.urlForm, id]);
  }

  postFindAll(): void {
  }

  delete(id: any) {
    Swal.fire({
      title: `Tem certeza que deseja remover o registro?`,
      text: 'A ação não poderá ser desfeita.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.value) {
        this.loaderService.display(true);
        this.service.delete(id)
          .subscribe(e => {
            Swal.fire('Sucesso!', 'Registro excluído com sucesso!', 'success');
            this.findAll();
            this.loaderService.display(false);
          }, error => {
            this.loaderService.display(false);
            this.showError(error);
          });
      }
    });
  }

  openBottomSheet(id): void {
    if (window.innerWidth <= 1200 && this.bottomSheetEnabled) {
      const sheet = this.bottom.open(BottomSheetComponent);
      sheet.afterDismissed().subscribe(action => {
        if (action === 'E') {
          this.edit(id);
        } else if (action === 'R') {
          this.delete(id);
        }
      });
    }
  }

  openForm() {
    this.router.navigate([this.urlForm]);
  }

  @HostListener('window:resize', ['$event'])
  buildColumnsTable() {
    if (this.hostListenerColumnEnable) {
      if (window.innerWidth <= 1200) {
        this.columnsTable.forEach((value, index) => {
          if (value === 'actions') {
            this.columnsTable.splice(index, 1);
          }
        });
      } else if (this.columnsTable.filter(value => value === 'actions').length === 0) {
        this.columnsTable.push('actions');
      }
    }
  }

  showError(error: any): void {
    Exception.addMessage(error);
  }
}
