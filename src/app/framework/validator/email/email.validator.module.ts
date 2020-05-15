import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmailValidatorDirective} from './email.validator.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    EmailValidatorDirective
  ],
  exports: [
    EmailValidatorDirective
  ]
})
export class EmailValidatorModule {
}
