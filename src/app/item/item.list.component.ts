import {Component, Injector} from '@angular/core';
import {Item} from './item';
import {ItemService} from './item.service';
import {CrudListComponent} from '../framework/component/crud.list.component';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {BottomSheetItemComponent} from './bottomScheetItem/bottomSheetItem.component';
import {ReservaService} from '../reserva/reserva.service';
import Swal from "sweetalert2";
import {Reserva} from '../reserva/reserva';

@Component({
  selector: 'app-list-item',
  templateUrl: './item.list.component.html',
  styleUrls: ['./item.list.component.css']
})
export class ItemListComponent extends CrudListComponent<Item, number> {

  isAlunoOrProfessor = false;
  reservasItem: Reserva[];
  dialogReservaitem = false;
  displayedColumnsReserva = ['dataRetirada', 'qtde'];

  constructor(protected itemService: ItemService,
              protected injector: Injector,
              private bottomSheetOptions: MatBottomSheet,
              private reservaService: ReservaService) {
    super(itemService, injector, ['id', 'nome', 'localizacao', 'saldo', 'actions'], 'item/form');
    this.bottomSheetEnabled = false;
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
      } else if (action === 'D') {
        this.findReservasItem(id);
      }
    });
  }

  findReservasItem(id) {
    this.loaderService.display(true);
    this.reservaService.findAllByIdItem(id)
      .subscribe(e => {
        this.loaderService.display(false);
        if (e.length > 0) {
          this.reservasItem = e;
          this.dialogReservaitem = true;
        } else {
          Swal.fire('Ops...', 'Este item não possui nenhuma reserva.', 'info');
        }
      }, error => {
        console.log(error);
        this.loaderService.display(false);
      });
  }

  copyItem(id) {
    this.router.navigate(['item/form/copy', id]);
  }
}
