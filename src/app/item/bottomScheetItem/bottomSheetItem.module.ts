import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BottomSheetItemComponent} from './bottomSheetItem.component';
import {MatIconModule} from '@angular/material/icon';
import {TooltipModule} from 'primeng/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    TooltipModule,
    MatButtonModule,
    MatListModule,
    MatBottomSheetModule
  ],
  declarations: [
    BottomSheetItemComponent
  ],
  exports: [
    BottomSheetItemComponent
  ]
})
export class BottomSheetItemModule {

}
