import {Component, Injector, OnInit} from '@angular/core';
import {Item} from './item';
import {ItemService} from './item.service';
import {CrudListComponent} from '../framework/component/crud.list.component';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {BottomSheetItemComponent} from './bottomScheetItem/bottomSheetItem.component';
import {ReservaService} from '../reserva/reserva.service';
import Swal from "sweetalert2";
import {Reserva} from '../reserva/reserva';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-view-item',
  templateUrl: './item.view.component.html',
  styleUrls: ['./item.view.component.css']
})
export class ItemViewComponent implements OnInit {
  isAlunoOrProfessor = false;
  reservasItem: Reserva[];
  dialogReservaitem = false;
  displayedColumnsReserva = ['dataRetirada', 'qtde'];
  layout: string = 'grid';
  minioUrl: String;
  itens: Item[];

  constructor(protected itemService: ItemService,
              protected injector: Injector,
              private loginService: LoginService,) {
    this.minioUrl = environment.minio_url;
  }

  ngOnInit() {
    this.itemService.findAll().subscribe(value => this.itens = value);
  }

  postFindAll(): void {
    this.loginService.userLoggedIsAlunoOrProfessor().then(value => this.isAlunoOrProfessor = value);
  }

  applyFilter(event: Event) {

  }
}
