import {CrudService} from '../framework/service/crud.service';
import {Cidade} from './cidade';
import {Injectable, Inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Estado} from '../estado/estado';

@Injectable()
export class CidadeService extends CrudService<Cidade, number> {

  constructor(@Inject(HttpClient) http: HttpClient) {
    super(`${environment.api_url}cidade/`, http);
  }

  completeByEstado(query: string, estado: Estado): Observable<Cidade[]> {
    return this.http.post<Cidade[]>(`${this.url}complete-by-estado?query=${query}`, estado);
  }
}
