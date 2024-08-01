import {Inject, Injectable} from '@angular/core';
import {CrudService} from '../framework/service/crud.service';
import {Compra} from './compra';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class CompraService extends CrudService<Compra, number> {

  constructor(@Inject(HttpClient) http: HttpClient) {
    super(`${environment.api_url}compra/`, http);
  }
}
