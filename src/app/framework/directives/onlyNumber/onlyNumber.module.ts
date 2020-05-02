import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OnlyNumberDirective} from './onlyNumber.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    OnlyNumberDirective
  ],
  exports: [
    OnlyNumberDirective
  ]
})
export class OnlyNumberModule {
}
