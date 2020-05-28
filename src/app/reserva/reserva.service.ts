import {Injectable} from '@angular/core';
import {CrudService} from '../framework/service/crud.service';
import {Reserva} from './reserva';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class ReservaService extends CrudService<Reserva, number> {

  constructor(http: HttpClient) {
    super(`${environment.api_url}reserva/`, http);
  }

  findAllByIdItem(id: number):Observable<Reserva[]> {
    return this.http.get<Reserva[]>(this.url + `find-all-by-item/${id}`);
  }
}
