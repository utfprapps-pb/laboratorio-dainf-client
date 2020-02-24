import {NgModule} from '@angular/core';
import {SidenavComponent} from './sidenav.component';
import {SidebarModule} from 'primeng';
import {
  MatExpansionModule, MatFormFieldModule,
  MatIconModule,
  MatListModule,
  MatMenuModule, MatSelectModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ToolbarModule} from "../toolbar/toolbar.module";

@NgModule({
  imports: [
    CommonModule,
    SidebarModule,
    MatListModule,
    MatIconModule,
    RouterModule,
    //
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSelectModule,
    MatToolbarModule,
    ToolbarModule
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
