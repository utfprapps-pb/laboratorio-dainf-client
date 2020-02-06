import {NgModule} from "@angular/core";
import {PageNotFoundComponent} from "./pageNotFound.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    PageNotFoundComponent
  ],
  exports: [
    PageNotFoundComponent
  ]
})
export class PageNotFoundModule {
}
