import {NgModule} from '@angular/core';
import {SidenavComponent} from './sidenav.component';
import {SidebarModule} from 'primeng';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {SidenavService} from './sidenav.service';

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
    MatSelectModule
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
