import {Injector, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {CrudService} from '../service/crud.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

export abstract class CrudListComponent<T, ID> implements OnInit {

  protected router: Router;
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

  openForm() {
    this.router.navigate([this.urlForm]);
  }

}
