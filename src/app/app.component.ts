import {Component} from '@angular/core';
import {LoginService} from './login/login.service';
import {Subject, Subscription} from 'rxjs';
import {NavigationCancel, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {LoaderService} from './framework/loader/loader.service';

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
        this.loaderService.display(true);
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
        this.loaderService.display(false);
        browserChange.next(true);
      }
    });
  }
}
