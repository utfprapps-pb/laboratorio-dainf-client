import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {Pais} from "./pais";
import {PaisService} from "./pais.service";

@Component({
  selector: 'app-list-pais',
  templateUrl: './pais.list.component.html',
  styleUrls: ['./pais.list.component.css']
})
export class PaisListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nome', 'sigla'];
  dataSource: MatTableDataSource<Pais>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private router: Router,
              private paisService: PaisService) {
  }

  ngOnInit() {
  }

  findAll() {

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openForm() {
    this.router.navigate(['pais/form']);
  }
}
