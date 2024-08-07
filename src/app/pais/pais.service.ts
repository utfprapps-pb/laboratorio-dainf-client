import {Inject, Injectable} from '@angular/core';
import {CrudService} from '../framework/service/crud.service';
import {Pais} from './pais';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class PaisService extends CrudService<Pais, number> {

  constructor(@Inject(HttpClient) http: HttpClient) {
    super(`${environment.api_url}pais/`, http);
  }

  complete(query: string): Observable<Pais[]> {
    return this.http.get<Pais[]>(`${this.url}complete?query=${query}`);
  }
}
