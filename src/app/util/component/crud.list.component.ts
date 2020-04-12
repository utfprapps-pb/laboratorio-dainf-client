import {HostListener, Injector, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {CrudService} from '../service/crud.service';
import {ConfirmationService, MessageService} from 'primeng';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {BottomSheetComponent} from '../../geral/bottomScheet/bottomSheet.component';
import {MatBottomSheet} from '@angular/material/bottom-sheet';

export abstract class CrudListComponent<T, ID> implements OnInit {

  protected router: Router;
  protected messageService: MessageService;
  protected confirmationService: ConfirmationService;
  protected bottom: MatBottomSheet;
  public displayedColumns: string[] = this.columnsTable;
  public dataSource: MatTableDataSource<T>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  objects: T[];

  ngOnInit(): void {
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
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  findAll() {
    this.service.findAll()
      .subscribe(e => {
        this.objects = e;
        if (e != null) {
          this.dataSource = new MatTableDataSource(e);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
  }

  edit(id: number) {
    this.router.navigate([this.urlForm, id]);
  }

  delete(id: any) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja remover o registro?',
      header: 'Confirmação',
      icon: 'fa fa-question-circle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.service.delete(id)
          .subscribe(e => {
            this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Registro excluído com sucesso!'});
            this.findAll();
          }, error => {
            this.messageService.add({severity: 'error', summary: 'Atenção', detail: 'Ocorreu um erro ao remover o registro!'});
            console.log(error);
          });
      }
    });
  }

  openBottomSheet(id): void {
    if (window.innerWidth <= 1200) {
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
