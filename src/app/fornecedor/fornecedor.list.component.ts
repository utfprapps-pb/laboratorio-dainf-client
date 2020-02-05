import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {Grupo} from "../grupo/grupo";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-fornecedor',
  templateUrl: './fornecedor.list.component.html',
  styleUrls: ['./fornecedor.list.component.css']
})
export class FornecedorListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'descricao'];
  dataSource: MatTableDataSource<Grupo>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openForm() {
    this.router.navigate(['fornecedor/form']);
  }
}
