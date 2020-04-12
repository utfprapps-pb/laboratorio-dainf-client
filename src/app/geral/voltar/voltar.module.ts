import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VoltarComponent} from './voltar.component';
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
    VoltarComponent
  ],
  exports: [
    VoltarComponent
  ]
})
export class VoltarModule {

}
