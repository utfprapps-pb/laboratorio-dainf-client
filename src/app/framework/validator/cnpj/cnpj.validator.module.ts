import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CnpjValidatorDirective} from './cnpj.validator.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CnpjValidatorDirective
  ],
  exports: [
    CnpjValidatorDirective
  ]
})
export class CnpjValidatorModule {
}
