import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {NotAuthorizedComponent} from "./notAuthorized.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    NotAuthorizedComponent
  ],
  exports: [
    NotAuthorizedComponent
  ]
})
export class NotAuthorizedModule {

}
