import {Inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Grupo} from './grupo';
import {CrudService} from '../framework/service/crud.service';
import {Observable} from 'rxjs';
import {Item} from '../item/item';

@Injectable()
export class GrupoService extends CrudService<Grupo, number> {

  constructor(@Inject(HttpClient) http: HttpClient) {
    super(`${environment.api_url}grupo/`, http);
  }

  complete(query: string): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(`${this.url}complete?query=${query}`);
  }

  findItensVinculados(id: number): Observable<Item[]> {
    return this.http.get<Item[]>(this.url + `itens-vinculados/${id}`);
  }
}
