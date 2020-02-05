import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {Estado} from "./estado";
import {EstadoService} from "./estado.service";

@Component({
  selector: 'app-list-estado',
  templateUrl: './estado.list.component.html',
  styleUrls: ['./estado.list.component.css']
})
export class EstadoListComponent implements OnInit {

  estados: Estado[];
  displayedColumns: string[] = ['id', 'nome', 'uf', 'pais'];
  dataSource: MatTableDataSource<Estado>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private router: Router,
              private estadoService: EstadoService) {
  }

  ngOnInit() {
    this.findAll();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  findAll() {
    this.estadoService.findAll()
      .subscribe(e => {
        this.estados = e;
      });
  }

  openForm() {
    this.router.navigate(['estado/form']);
  }
}
