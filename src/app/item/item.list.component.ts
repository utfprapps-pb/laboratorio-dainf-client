import {Component, Injector} from '@angular/core';
import {Item} from './item';
import {ItemService} from './item.service';
import {CrudListComponent} from '../util/component/crud.list.component';

@Component({
  selector: 'app-list-item',
  templateUrl: './item.list.component.html',
  styleUrls: ['./item.list.component.css']
})
export class ItemListComponent extends CrudListComponent<Item, number> {

  constructor(protected itemService: ItemService,
              protected injector: Injector) {
    super(itemService, injector, ['id', 'nome'], 'item/form');
  }
}
