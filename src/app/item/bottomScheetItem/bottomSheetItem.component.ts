import {Component} from '@angular/core';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {LoginService} from '../../login/login.service';

@Component({
  selector: 'app-bottom-sheet-item',
  templateUrl: './bottomSheetItem.component.html',
  styleUrls: ['./bottomSheetItem.component.css']
})
export class BottomSheetItemComponent {

  isAlunoOrProfessor = true;

  constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheetItemComponent>,
              private loginService: LoginService) {
    loginService.userLoggedIsAlunoOrProfessor().then(value => this.isAlunoOrProfessor = value);
  }

  click(action) {
    this.bottomSheetRef.dismiss(action);
  }
}
