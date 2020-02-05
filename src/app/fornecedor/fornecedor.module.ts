import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatTableModule
} from "@angular/material";
import {AutoCompleteModule, InputTextModule, TooltipModule} from "primeng";
import {FornecedorFormComponent} from "./fornecedor.form.component";
import {FornecedorListComponent} from "./fornecedor.list.component";
import {FornecedorService} from "./fornecedor.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    InputTextModule,
    TooltipModule,
    AutoCompleteModule
  ],
  declarations: [
    FornecedorFormComponent,
    FornecedorListComponent
  ],
  exports: [
    FornecedorFormComponent,
    FornecedorListComponent
  ],
  providers: [
    FornecedorService
  ]
})
export class FornecedorModule {

}
