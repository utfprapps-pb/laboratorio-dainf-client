import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CadastroRapidoComponent} from './cadastroRapido.component';
import {TooltipModule} from 'primeng/tooltip';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    TooltipModule,
    RouterModule
  ],
  exports: [
    CadastroRapidoComponent
  ],
  declarations: [
    CadastroRapidoComponent
  ]
})
export class CadastroRapidoModule {

}
