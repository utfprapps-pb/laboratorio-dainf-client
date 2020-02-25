import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Router} from '@angular/router';
import {LoginService} from './login/login.service';
import {MessageService} from 'primeng/api';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {

  constructor(private router: Router,
              private messageService: MessageService,
              private loginService: LoginService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token && !req.headers.has('Authorization')) {
      const authReq = req.clone({
        headers: req.headers
      });

      const authReqWithBearer = authReq.clone({
        headers: authReq.headers.set('Authorization', 'Bearer ' + token)
      });
      return next.handle(authReqWithBearer).pipe(
        tap(() => {
        }, err => {
          if (err.status === 403) {
            this.messageService.add({severity: 'info', detail: 'Você não tem permissão para acessar este recurso'});
          } else if (err.status === 401) {
            this.loginService.logout();
          }
        })
      );
    }
    return next.handle(req);
  }

}
