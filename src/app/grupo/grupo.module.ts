import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {GrupoListComponent} from "./grupo.list.component";
import {GrupoFormComponent} from "./grupo.form.component";
import {MatFormFieldModule, MatInputModule, MatPaginatorModule, MatTableModule} from "@angular/material";
import {GrupoService} from "./grupo.service";

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule
  ],
  declarations: [
    GrupoListComponent,
    GrupoFormComponent
  ],
  exports: [
    GrupoListComponent,
    GrupoFormComponent
  ],
  providers: [
    GrupoService
  ]
})
export class GrupoModule {

}
