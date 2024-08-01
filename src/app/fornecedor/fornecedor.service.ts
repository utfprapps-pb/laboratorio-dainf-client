import {Inject, Injectable} from '@angular/core';
import {CrudService} from '../framework/service/crud.service';
import {Fornecedor} from './fornecedor';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class FornecedorService extends CrudService<Fornecedor, number> {

  constructor(@Inject(HttpClient) http: HttpClient) {
    super(`${environment.api_url}fornecedor/`, http);
  }

  complete(query: string): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(`${this.url}complete?query=${query}`);
  }
}
