import {Inject, Injectable} from '@angular/core';
import {CrudService} from '../framework/service/crud.service';
import {SolicitacaoCompra} from './solicitacaoCompra';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class SolicitacaoCompraService extends CrudService<SolicitacaoCompra, number> {

  constructor(@Inject(HttpClient) http: HttpClient) {
    super(`${environment.api_url}solicitacao-compra/`, http);
  }
}
