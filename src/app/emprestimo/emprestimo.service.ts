import {Injectable} from '@angular/core';
import {CrudService} from '../framework/service/crud.service';
import {Emprestimo} from './emprestimo';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {EmprestimoFilter} from './emprestimo.filter';

@Injectable()
export class EmprestimoService extends CrudService<Emprestimo, number> {

  constructor(http: HttpClient) {
    super(`${environment.api_url}emprestimo/`, http);
  }

  saveDevolucao(emprestimo: Emprestimo): Observable<Emprestimo> {
    return this.http.post<Emprestimo>(this.getUrl() + 'save-devolucao', emprestimo);
  }

  filter(filter: EmprestimoFilter): Observable<Emprestimo[]> {
    return this.http.post<Emprestimo[]>(this.getUrl() + 'filter', filter);
  }
}
