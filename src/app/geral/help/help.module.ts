import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HelpComponent} from './help.component';
import {MatIconModule} from '@angular/material/icon';
import {TooltipModule} from 'primeng/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {DialogModule} from 'primeng/dialog';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    TooltipModule,
    MatButtonModule,
    DialogModule,
  ],
  declarations: [
    HelpComponent
  ],
  exports: [
    HelpComponent
  ]
})
export class HelpModule {

}
