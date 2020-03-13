import {Injectable} from '@angular/core';
import {CrudService} from '../util/service/crud.service';
import {Emprestimo} from './emprestimo';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class EmprestimoService extends CrudService<Emprestimo, number> {

  constructor(http: HttpClient) {
    super(`${environment.api_url}emprestimo/`, http);
  }
}
