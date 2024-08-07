import {CrudService} from '../framework/service/crud.service';
import {Usuario} from './usuario';
import {Inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Permissao} from './permissao';

@Injectable()
export class UsuarioService extends CrudService<Usuario, number> {

  constructor(@Inject(HttpClient) http: HttpClient) {
    super(`${environment.api_url}usuario/`, http);
  }

  findAllPermissao(): Observable<Permissao[]> {
    return this.http.get<Permissao[]>(this.url + 'permissao');
  }

  changeSenha(usuario: Usuario, senhaAtual: string): Observable<Usuario> {
    return this.http.post<Usuario>(this.url  + `change-senha?senhaAtual=${senhaAtual}`, usuario);
  }

  findByUsername(username: string): Observable<Usuario> {
    return this.http.get<Usuario>(this.url + `find-by-username?username=${username}`);
  }

  completeCustom(query: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.url}complete-custom?query=${query}`);
  }

  completeCustomUsersLab(query: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.url}complete-users-lab?query=${query}`);
  }

  updateUser(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.url  + `update-user`, usuario);
  }
}
