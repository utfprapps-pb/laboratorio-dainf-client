import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ValidationDirective} from './validation.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ValidationDirective
  ],
  exports: [
    ValidationDirective
  ]
})
export class ValidationModule {
}
