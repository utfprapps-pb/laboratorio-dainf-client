import {Component} from '@angular/core';
import {LoginService} from './login/login.service';
import {Subject, Subscription} from 'rxjs';
import {NavigationCancel, NavigationEnd, NavigationStart, NavigationError, Router} from '@angular/router';
import {LoaderService} from './framework/loader/loader.service';

export let browserChange = new Subject<boolean>();

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent {
  title = 'tcc-client';
  isAuthenticated = false;
  subscription: Subscription;

  constructor(private loginService: LoginService,
              private router: Router,
              private loaderService: LoaderService) {
    loginService.isAuthenticated.asObservable()
      .subscribe(e => this.isAuthenticated = e);
    this.buildSubscriptionEvent();
  }

  verifyAccess(role: string): boolean {
    return this.loginService.hasAnyRole(role);
  }

  buildSubscriptionEvent() {
    this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loaderService.show();
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        if (event instanceof NavigationError) {
          console.error('[NavigationError]', event.error);
        }
        this.loaderService.hide();
        browserChange.next(true);
      }
    });
  }
}
