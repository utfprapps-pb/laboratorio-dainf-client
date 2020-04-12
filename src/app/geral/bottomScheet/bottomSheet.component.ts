import {Component} from '@angular/core';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottomSheet.component.html',
  styleUrls: ['./bottomSheet.component.css']
})
export class BottomSheetComponent {

  constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>) {
  }

  click(action) {
    this.bottomSheetRef.dismiss(action);
  }
}
