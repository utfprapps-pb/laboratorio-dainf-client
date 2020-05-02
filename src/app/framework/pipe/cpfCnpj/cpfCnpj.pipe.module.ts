import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CpfCnpjPipe} from './cpfCnpj.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CpfCnpjPipe
  ],
  exports: [
    CpfCnpjPipe
  ]
})
export class CpfCnpjPipeModule {

}
