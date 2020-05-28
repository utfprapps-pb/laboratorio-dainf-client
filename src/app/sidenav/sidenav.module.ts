import {NgModule} from '@angular/core';
import {SidenavComponent} from './sidenav.component';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import {SidenavService} from './sidenav.service';

@NgModule({
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    RouterModule,
    MatSidenavModule,
    MatExpansionModule
  ],
  exports: [
    SidenavComponent
  ],
  declarations: [
    SidenavComponent
  ],
  providers: [
    SidenavService
  ]
})
export class SidenavModule {

}
