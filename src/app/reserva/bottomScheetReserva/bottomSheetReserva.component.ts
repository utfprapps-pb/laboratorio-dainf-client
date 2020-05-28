import {Component} from '@angular/core';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {LoginService} from '../../login/login.service';

@Component({
  selector: 'app-bottom-sheet-reserva',
  templateUrl: './bottomSheetReserva.component.html',
  styleUrls: ['./bottomSheetReserva.component.css']
})
export class BottomSheetReservaComponent {

  isAlunoOrProfessor = true;

  constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheetReservaComponent>,
              private loginService: LoginService) {
    loginService.userLoggedIsAlunoOrProfessor().then(value => this.isAlunoOrProfessor = value);
  }

  click(action) {
    this.bottomSheetRef.dismiss(action);
  }
}
