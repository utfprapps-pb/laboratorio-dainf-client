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
import {CidadeFormComponent} from "./cidade.form.component";
import {CidadeListComponent} from "./cidade.list.component";
import {CidadeService} from "./cidade.service";

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
    CidadeFormComponent,
    CidadeListComponent
  ],
  exports: [
    CidadeFormComponent,
    CidadeListComponent
  ],
  providers: [
    CidadeService
  ]
})
export class CidadeModule {

}
