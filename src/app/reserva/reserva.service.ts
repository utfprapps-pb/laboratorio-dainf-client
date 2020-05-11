import {Injectable} from '@angular/core';
import {CrudService} from '../framework/service/crud.service';
import {Reserva} from './reserva';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class ReservaService extends CrudService<Reserva, number> {

  constructor(http: HttpClient) {
    super(`${environment.api_url}reserva/`, http);
  }
}
