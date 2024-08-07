import {Inject, Injectable} from '@angular/core';
import {CrudService} from '../framework/service/crud.service';
import {Saida} from './saida';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class SaidaService extends CrudService<Saida, number> {

  constructor(@Inject(HttpClient) http: HttpClient) {
    super(`${environment.api_url}saida/`, http);
  }
}
