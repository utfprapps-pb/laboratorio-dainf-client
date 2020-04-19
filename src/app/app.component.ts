import { Component } from '@angular/core';
import {LoginService} from './login/login.service';
import {Subject, Subscription} from 'rxjs';
import {NavigationCancel, NavigationEnd, NavigationStart, Router} from '@angular/router';

export let browserChange = new Subject<boolean>();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tcc-client';
  isAuthenticated = false;
  subscription: Subscription;

  constructor(private loginService: LoginService,
              private router: Router) {
    loginService.isAuthenticated.asObservable()
      .subscribe(e => this.isAuthenticated = e);
    this.buildSubscriptionEvent();
  }

  buildSubscriptionEvent() {
    this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        browserChange.next(true);
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
        // TODO será implementado
      }
    });
  }
}
