import {CrudService} from '../framework/service/crud.service';
import {Item} from './item';
import {Inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {ItemImage} from './itemImage';

@Injectable()
export class ItemService extends CrudService<Item, number> {

  constructor(@Inject(HttpClient) http: HttpClient) {
    super(`${environment.api_url}item/`, http);
  }

  completeItem(query: string, hasEstoque: boolean): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.url}complete?query=${query}&hasEstoque=${hasEstoque}`);
  }

  findAllImagesItem(idItem: number): Observable<ItemImage[]> {
    return this.http.get<ItemImage[]>(this.url + `imagens/${idItem}`);
  }

  deleteImage(itemImage: ItemImage, idItem: number): Observable<void> {
    return this.http.post<void>(`${this.url}delete-image/${idItem}`, itemImage);
  }
}
