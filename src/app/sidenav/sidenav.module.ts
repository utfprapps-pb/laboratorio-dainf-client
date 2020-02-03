import {NgModule} from '@angular/core';
import {SidenavComponent} from './sidenav.component';
import {SidebarModule} from "primeng";
import {MatIconModule, MatListModule} from "@angular/material";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    CommonModule,
    SidebarModule,
    MatListModule,
    MatIconModule,
    RouterModule
  ],
  exports: [
    SidenavComponent
  ],
  declarations: [
    SidenavComponent
  ],
  providers: []
})
export class SidenavModule {

}
