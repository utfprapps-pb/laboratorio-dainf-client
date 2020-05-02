import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CnpjDirective} from './cnpj.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CnpjDirective
  ],
  exports: [
    CnpjDirective
  ]
})
export class CnpjModule {
}
