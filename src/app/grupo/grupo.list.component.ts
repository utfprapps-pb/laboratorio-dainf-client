import { Component, OnInit } from '@angular/core';
import {Grupo} from "./grupo";

@Component({
  selector: 'app-list-grupo',
  templateUrl: './grupo.list.component.html',
  styleUrls: ['./grupo.list.component.css']
})
export class GrupoListComponent implements OnInit {

  cols: any[];
  grupos: Grupo[];

  constructor() { }

  ngOnInit() {
    this.cols = [
      { field: 'id', header: 'Código' },
      { field: 'descricao', header: 'Descrição' },
    ];

    let grupo = new Grupo();
    grupo.id = 1;
    grupo.descricao = "teste";

    this.grupos = new Array();
    this.grupos.push(grupo);
  }

}
