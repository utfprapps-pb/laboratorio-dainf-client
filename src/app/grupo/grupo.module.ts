import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {GrupoListComponent} from "./grupo.list.component";
import {GrupoFormComponent} from "./grupo.form.component";
import {TableModule} from "primeng";

@NgModule({
  imports: [
    CommonModule,
    TableModule
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

  ]
})
export class GrupoModule {

}
