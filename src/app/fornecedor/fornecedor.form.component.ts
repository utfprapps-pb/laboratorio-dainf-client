import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Fornecedor} from "./fornecedor";

@Component({
  selector: 'app-form-fornecedor',
  templateUrl: './fornecedor.form.component.html',
  styleUrls: ['./fornecedor.form.component.css']
})
export class FornecedorFormComponent implements OnInit {

  fornecedor: Fornecedor;
  fornecedoresList: Fornecedor[];

  constructor(private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.fornecedor = new Fornecedor();
    this.route.params.subscribe()
  }

  back() {
    this.router.navigate(['fornecedor']);
  }

  save() {}

  findFornecedores($event) {

  }

}
