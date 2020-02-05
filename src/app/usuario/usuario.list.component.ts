import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {Usuario} from "./usuario";
import {UsuarioService} from "./usuario.service";

@Component({
  selector: 'app-list-usuario',
  templateUrl: './usuario.list.component.html',
  styleUrls: ['./usuario.list.component.css']
})
export class UsuarioListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nome', 'usuario'];
  dataSource: MatTableDataSource<Usuario>;
  usuarios: Usuario[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private router: Router,
              private usuarioService: UsuarioService) {
  }

  ngOnInit() {
    this.findAll();
    if (this.usuarios != null && this.usuarios.length > 0) {
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

  openForm() {
    this.router.navigate(['usuario/form']);
  }

  findAll() {
    this.usuarioService.findAll()
      .subscribe(e => {
        this.usuarios = e;
        this.dataSource = new MatTableDataSource(e);
      });
  }
}
