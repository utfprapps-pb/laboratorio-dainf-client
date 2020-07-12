import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TelefoneFormatDirective} from "./telefone.format.directive";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TelefoneFormatDirective
  ],
  exports: [
    TelefoneFormatDirective
  ]
})
export class TelefoneFormatModule{ }
