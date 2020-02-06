import {Component} from '@angular/core';

@Component({
  selector: 'app-notAuthorized',
  templateUrl: './notAuthorized.component.html',
  styleUrls: ['./notAuthorized.component.css']
})
export class NotAuthorizedComponent {

  constructor() {
  }

  back() {
    window.history.back();
  }
}
