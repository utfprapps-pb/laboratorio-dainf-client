import {Component, Injector} from '@angular/core';
import {CrudListComponent} from '../framework/component/crud.list.component';
import {Reserva} from './reserva';
import {ReservaService} from './reserva.service';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {BottomSheetReservaComponent} from './bottomScheetReserva/bottomSheetReserva.component';

@Component({
  selector: 'app-list-reserva',
  templateUrl: './reserva.list.component.html',
  styleUrls: ['./reserva.list.component.css']
})
export class ReservaListComponent extends CrudListComponent<Reserva, number> {

  constructor(protected reservaService: ReservaService,
              protected injector: Injector,
              private bottomSheetOptions: MatBottomSheet) {
    super(reservaService, injector, ['id', 'descricao', 'dataReserva', 'dataRetirada', 'usuario'], 'reserva/form');
    this.bottomSheetEnabled = false;
    this.hostListenerColumnEnable = false;
  }

  ngOnInit(): void {
    this.loginService.userLoggedIsAlunoOrProfessor().then(value => {
      this.isAlunoOrProfessor = value;
      this.isAlunoOrProfessor ? this.findAllByUsername() : this.findAll();
    });
  }

  openOptions(reserva: Reserva): void {
    const sheet = this.bottomSheetOptions.open(BottomSheetReservaComponent);
    sheet.afterDismissed().subscribe(action => {
      if (action === 'E') {
        this.edit(reserva.id);
      } else if (action === 'R') {
        this.delete(reserva.id);
      } else if (action === 'F') {
        this.finalizarReserva(reserva);
      }
    });
  }

  finalizarReserva(reserva) {
    localStorage.setItem('reserva-to-emprestimo', JSON.stringify(reserva));
    this.router.navigate(['emprestimo/form/reserva']);
  }


  postFindAll(): void {
    if (this.dataSource != null) {
      this.dataSource.sortingDataAccessor = (data, sortHeaderId) => {
        switch (sortHeaderId) {
          case 'usuario':
            return data.usuario.nome;
          default:
            return data[sortHeaderId];
        }
      };
    }
  }
}
