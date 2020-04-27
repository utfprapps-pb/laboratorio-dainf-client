import {Component} from '@angular/core';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-bottom-sheet-emprestimo',
  templateUrl: './bottomSheet.component.html',
  styleUrls: ['./bottomSheetEmprestimo.component.css']
})
export class BottomSheetEmprestimoComponent {

  constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheetEmprestimoComponent>) {
  }

  click(action) {
    this.bottomSheetRef.dismiss(action);
  }
}
