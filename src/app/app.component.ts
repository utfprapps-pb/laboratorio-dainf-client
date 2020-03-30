import { Component } from '@angular/core';
import {LoginService} from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tcc-client';

  isAuthenticated = false;

  constructor(private loginService: LoginService) {
    loginService.isAuthenticated.asObservable()
      .subscribe(e => this.isAuthenticated = e);
  }
}
