import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToolbarComponent} from './toolbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule} from '@angular/router';
import {TieredMenuModule} from 'primeng';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    RouterModule,
    TieredMenuModule
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
