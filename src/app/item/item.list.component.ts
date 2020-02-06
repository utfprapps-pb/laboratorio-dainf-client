import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {Item} from "./item";
import {Router} from "@angular/router";
import {ItemService} from "./item.service";

@Component({
  selector: 'app-list-item',
  templateUrl: './item.list.component.html',
  styleUrls: ['./item.list.component.css']
})
export class ItemListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nome'];
  dataSource: MatTableDataSource<Item>;
  itens: Item[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private router: Router,
              private itemService: ItemService) {
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
    this.itemService.findAll()
      .subscribe(e => {
        this.itens = e;
    })
  }

  openForm() {
    this.router.navigate(['item/form']);
  }

}
