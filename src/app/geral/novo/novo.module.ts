import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NovoComponent} from './novo.component';
import {MatIconModule} from '@angular/material/icon';
import {TooltipModule} from 'primeng/tooltip';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    TooltipModule,
    MatButtonModule,
  ],
  declarations: [
    NovoComponent
  ],
  exports: [
    NovoComponent
  ]
})
export class NovoModule {

}
