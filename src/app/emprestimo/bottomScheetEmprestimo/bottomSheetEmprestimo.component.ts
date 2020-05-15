import {Component} from '@angular/core';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {LoginService} from '../../login/login.service';

@Component({
  selector: 'app-bottom-sheet-emprestimo',
  templateUrl: './bottomSheet.component.html',
  styleUrls: ['./bottomSheetEmprestimo.component.css']
})
export class BottomSheetEmprestimoComponent {

  isAlunoOrProfessor = false;

  constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheetEmprestimoComponent>,
              private loginService: LoginService) {
    loginService.userLoggedIsAlunoOrProfessor().then(value => this.isAlunoOrProfessor = value);
  }

  click(action) {
    this.bottomSheetRef.dismiss(action);
  }
}
