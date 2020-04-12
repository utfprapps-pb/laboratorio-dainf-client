import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SalvarComponent} from './salvar.component';
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
    SalvarComponent
  ],
  exports: [
    SalvarComponent
  ]
})
export class SalvarModule {

}
