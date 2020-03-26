import {Component, OnInit, ViewChild} from '@angular/core';
import {LoginService} from './login.service';
import {Usuario} from '../usuario/usuario';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {MessageService} from 'primeng';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario;
  @ViewChild('form', {static: true}) form: NgForm;

  constructor(private loginService: LoginService,
              private router: Router,
              private messageService: MessageService) { }

  ngOnInit() {
    this.usuario = new Usuario();
  }

  login() {
    this.loginService.login(this.usuario)
      .subscribe(e => {
        localStorage.setItem('token', e);
        localStorage.setItem('username', this.usuario.username);
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.messageService.add({severity: 'error', summary: 'Atenção', detail: 'Usuário e/ou senha incorretos'});
      });
  }
}
