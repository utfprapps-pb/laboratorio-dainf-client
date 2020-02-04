import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Grupo} from './grupo';
import {CrudService} from '../util/service/crud.service';

@Injectable()
export class GrupoService extends CrudService<Grupo, number> {

  constructor(http: HttpClient) {
    super(`${environment.api_url}grupo/`, http);
  }
}
