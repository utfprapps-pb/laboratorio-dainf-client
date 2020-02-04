import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Grupo} from './grupo';
import {GrupoService} from './grupo.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-grupo',
  templateUrl: './grupo.list.component.html',
  styleUrls: ['./grupo.list.component.css']
})
export class GrupoListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'descricao'];
  dataSource: MatTableDataSource<Grupo>;
  grupos: Grupo[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private grupoService: GrupoService,
              private router: Router) {
  }

  ngOnInit() {
    this.findAll();
    if (this.grupos != null && this.grupos.length > 0) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  findAll() {
    this.grupoService.findAll().subscribe(e => {
      this.grupos = e;
      this.dataSource = new MatTableDataSource(e);
    });
  }

  openForm() {
    this.router.navigate(['form']);
  }
}
