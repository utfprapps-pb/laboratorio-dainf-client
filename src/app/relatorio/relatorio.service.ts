import {Injectable} from '@angular/core';
import {CrudService} from '../framework/service/crud.service';
import {Relatorio} from './relatorio';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class RelatorioService extends CrudService<Relatorio, number> {

  constructor(http: HttpClient) {
    super(`${environment.api_url}relatorio/`, http);
  }

  generateReport(map: any): Observable<any> {
    return this.http.post<any>(this.url + `generate-report`, map, {responseType: 'arraybuffer' as 'json'});
  }
}
