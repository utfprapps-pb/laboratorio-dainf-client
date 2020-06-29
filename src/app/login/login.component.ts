import {Component, OnInit, ViewChild} from '@angular/core';
import {LoginService} from './login.service';
import {Usuario} from '../usuario/usuario';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {MessageService} from 'primeng';
import {UsuarioService} from '../usuario/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario;
  showProgress = false;
  @ViewChild('form', {static: true}) form: NgForm;

  constructor(private loginService: LoginService,
              private router: Router,
              private messageService: MessageService,
              private usuarioService: UsuarioService) {
  }

  ngOnInit() {
    this.usuario = new Usuario();
  }

  login() {
    this.showProgress = true;
    this.loginService.login(this.usuario)
      .subscribe(e => {
        localStorage.setItem('token', e);
        localStorage.setItem('username', this.usuario.username);
        this.setUserInLocalStorage();
      }, error => {
        console.log(error);
        this.showProgress = false;
        this.messageService.add({severity: 'error', summary: 'Atenção', detail: 'Usuário e/ou senha incorretos'});
      });
  }

  setUserInLocalStorage() {
    this.usuarioService.findByUsername(this.usuario.username)
      .subscribe(user => {
        localStorage.setItem('userLogged', JSON.stringify(user));
        this.showProgress = false;
        this.router.navigate(['/']);
      });
  }
}
