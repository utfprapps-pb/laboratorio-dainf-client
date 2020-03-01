import {Injector, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {CrudService} from '../service/crud.service';
import {MessageService} from 'primeng';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

export abstract class CrudListComponent<T, ID> implements OnInit {

  protected router: Router;
  protected messageService: MessageService;
  protected displayedColumns: string[] = this.columnsTable;
  protected dataSource: MatTableDataSource<T>;
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
        if (e != null && e.length > 0) {
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
    this.service.delete(id)
      .subscribe(e => {
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Registro excluído com sucesso!'});
        this.findAll();
      }, error => {
        this.messageService.add({severity: 'error', summary: 'Atenção', detail: 'Ocorreu um erro ao remover o registro!'});
        console.log(error);
      });

  }

  openForm() {
    this.router.navigate([this.urlForm]);
  }

}
