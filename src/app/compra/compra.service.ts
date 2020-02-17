import {Injectable} from '@angular/core';
import {CrudService} from '../util/service/crud.service';
import {Compra} from './compra';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class CompraService extends CrudService<Compra, number> {

  constructor(http: HttpClient) {
    super(`${environment.api_url}compra/`, http);
  }
}
