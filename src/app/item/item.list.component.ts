import {Component, Injector} from '@angular/core';
import {Item} from './item';
import {ItemService} from './item.service';
import {CrudListComponent} from '../framework/component/crud.list.component';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {BottomSheetItemComponent} from './bottomScheetItem/bottomSheetItem.component';

@Component({
  selector: 'app-list-item',
  templateUrl: './item.list.component.html',
  styleUrls: ['./item.list.component.css']
})
export class ItemListComponent extends CrudListComponent<Item, number> {

  isAlunoOrProfessor;

  constructor(protected itemService: ItemService,
              protected injector: Injector,
              private bottomSheetOptions: MatBottomSheet) {
    super(itemService, injector, ['id', 'nome', 'localizacao', 'saldo'], 'item/form');
    this.bottomSheetEnabled = false;
    this.hostListenerColumnEnable = false;
  }

  postFindAll(): void {
    this.loginService.userLoggedIsAlunoOrProfessor().then(value => this.isAlunoOrProfessor = value);
  }

  openOptions(id): void {
    const sheet = this.bottomSheetOptions.open(BottomSheetItemComponent);
    sheet.afterDismissed().subscribe(action => {
      if (action === 'E') {
        this.edit(id);
      } else if (action === 'R') {
        this.delete(id);
      } else if (action === 'C') {
        this.copyItem(id);
      }
    });
  }

  copyItem(id) {
    this.router.navigate(['item/form/copy', id]);
  }
}
