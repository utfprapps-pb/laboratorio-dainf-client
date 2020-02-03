import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToolbarComponent} from './toolbar.component';
import {MatToolbarModule} from '@angular/material';
import {SidenavModule} from '../sidenav/sidenav.module';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    SidenavModule
  ],
  declarations: [
    ToolbarComponent
  ],
  exports: [
    ToolbarComponent
  ],
  providers: []
})
export class ToolbarModule {
}
