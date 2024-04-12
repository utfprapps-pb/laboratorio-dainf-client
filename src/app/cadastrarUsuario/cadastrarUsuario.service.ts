import { CrudService } from "../framework/service/crud.service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { UsuarioCadastro } from "./usuarioCadastro";
import { EmailConfirmacao } from "./emailConfirmacao";
import { RecuperarSenha } from "./recuperarSenha";

@Injectable()
export class CadastrarUsuarioService extends CrudService<
  UsuarioCadastro,
  number
> {
  constructor(http: HttpClient) {
    super(`${environment.api_url}usuario/`, http);
  }

  saveUser(usuario: UsuarioCadastro): Observable<UsuarioCadastro> {
    return this.http.post<UsuarioCadastro>(this.url + `new-user`, usuario);
  }

  resendConfirmEmail(emailConfirmacao: EmailConfirmacao): Observable<void> {
    return this.http.post<void>(this.url + `resend-confirm-email`, emailConfirmacao);
  }

  confirmarEmail(emailConfirmacao: EmailConfirmacao): Observable<void> {
    return this.http.post<void>(this.url + `confirm-email`, emailConfirmacao);
  }

  requisitarRecuperarSenha(emailConfirmacao: EmailConfirmacao): Observable<void> {
    return this.http.post<void>(this.url + `request-code-reset-password`, emailConfirmacao);
  }

  recuperarSenha(recuperarSenha: RecuperarSenha): Observable<void> {
    return this.http.post<void>(this.url + `reset-password`, recuperarSenha);
  }

  // changeSenha(usuario: Usuario, senhaAtual: string): Observable<Usuario> {
  //   return this.http.post<Usuario>(this.url  + `change-senha?senhaAtual=${senhaAtual}`, usuario);
  // }

  // findByUsername(username: string): Observable<Usuario> {
  //   return this.http.get<Usuario>(this.url + `find-by-username?username=${username}`);
  // }

  // completeCustom(query: string): Observable<Usuario[]> {
  //   return this.http.get<Usuario[]>(`${this.url}complete-custom?query=${query}`);
  // }

  // completeCustomUsersLab(query: string): Observable<Usuario[]> {
  //   return this.http.get<Usuario[]>(`${this.url}complete-users-lab?query=${query}`);
  // }

  // updateUser(usuario: Usuario): Observable<Usuario> {
  //   return this.http.post<Usuario>(this.url  + `update-user`, usuario);
  // }
}
