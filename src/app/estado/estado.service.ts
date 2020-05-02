import {Injectable} from '@angular/core';
import {CrudService} from '../framework/service/crud.service';
import {Estado} from './estado';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class EstadoService extends CrudService<Estado, number> {

  constructor(http: HttpClient) {
    super(`${environment.api_url}estado/`, http);
  }

  complete(query: string): Observable<Estado[]> {
    return this.http.get<Estado[]>(`${this.url}complete?query=${query}`);
  }
}
