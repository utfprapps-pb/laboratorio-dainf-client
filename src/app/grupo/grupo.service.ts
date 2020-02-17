import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Grupo} from './grupo';
import {CrudService} from '../util/service/crud.service';
import {Observable} from 'rxjs';

@Injectable()
export class GrupoService extends CrudService<Grupo, number> {

  constructor(http: HttpClient) {
    super(`${environment.api_url}grupo/`, http);
  }

  complete(query: string): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(`${this.url}complete?query=${query}`);
  }
}
