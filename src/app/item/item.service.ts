import {CrudService} from '../framework/service/crud.service';
import {Item} from './item';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class ItemService extends CrudService<Item, number> {

  constructor(http: HttpClient) {
    super(`${environment.api_url}item/`, http);
  }

  completeItem(query: string, hasEstoque: boolean): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.url}complete?query=${query}&hasEstoque=${hasEstoque}`);
  }

  findAllImagesItem(idItem: number): Observable<string[]> {
    return this.http.get<string[]>(this.url + `imagens/${idItem}`);
  }
}
