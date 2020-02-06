import {Component, OnInit, ViewChild} from '@angular/core';
import {CidadeService} from "./cidade.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {Cidade} from "./cidade";

@Component({
  selector: 'app-list-cidade',
  templateUrl: './cidade.list.component.html',
  styleUrls: ['./cidade.list.component.css']
})
export class CidadeListComponent implements OnInit {

  cidades: Cidade[];
  displayedColumns: string[] = ['id', 'nome'];
  dataSource: MatTableDataSource<Cidade>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private cidadeService: CidadeService,
              private route: ActivatedRoute,
              private router: Router) {
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
    this.cidadeService.findAll()
      .subscribe(e => {
        this.cidades = e;
      });
  }

  openForm() {
    this.router.navigate(['cidade/form']);
  }
}
