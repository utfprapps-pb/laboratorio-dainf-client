import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, Subject, throwError} from 'rxjs';
import {Usuario} from '../usuario/usuario';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';

@Injectable()
export class LoginService {

  url: string;
  isAuthenticated = new Subject<boolean>();

  constructor(private http: HttpClient,
              private router: Router) {
    this.url = environment.api_url + 'login';
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url = `${environment.api_url}usuario/user-info`;
    return this.http.get(url).pipe(
      map(e => {
        this.isAuthenticated.next(true);
        return true;
      }),
      catchError(err => {
        this.logout();
        return throwError(new Error('O usuário não está autenticado!'));
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.isAuthenticated.next(false);
    this.router.navigate(['/login']);
  }

  login(usuario: Usuario): Observable<string> {
    return this.http.post<string>(this.url, usuario, {responseType: 'text' as 'json'});
  }
}
