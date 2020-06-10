import {Component, HostListener} from '@angular/core';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {LoginService} from '../../login/login.service';

@Component({
  selector: 'app-bottom-sheet-item',
  templateUrl: './bottomSheetItem.component.html',
  styleUrls: ['./bottomSheetItem.component.css']
})
export class BottomSheetItemComponent {

  isAlunoOrProfessor = true;
  showEditAndDelete = false;

  constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheetItemComponent>,
              private loginService: LoginService) {
    loginService.userLoggedIsAlunoOrProfessor().then(value => this.isAlunoOrProfessor = value);
    this.buildResizeListener();
  }

  click(action) {
    this.bottomSheetRef.dismiss(action);
  }

  @HostListener('window:resize', ['$event'])
  buildResizeListener() {
    if (window.innerWidth <= 1200) {
      this.showEditAndDelete = true;
    } else {
      this.showEditAndDelete = false;
    }
  }

}
