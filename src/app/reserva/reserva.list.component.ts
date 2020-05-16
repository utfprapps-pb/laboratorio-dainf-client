import {Component, Injector} from '@angular/core';
import {CrudListComponent} from '../framework/component/crud.list.component';
import {Reserva} from './reserva';
import {ReservaService} from './reserva.service';

@Component({
  selector: 'app-list-reserva',
  templateUrl: './reserva.list.component.html',
  styleUrls: ['./reserva.list.component.css']
})
export class ReservaListComponent extends CrudListComponent<Reserva, number> {

  constructor(protected reservaService: ReservaService,
              protected injector: Injector) {
    super(reservaService, injector, ['id', 'descricao', 'dataReserva', 'usuario', 'actions'], 'reserva/form');
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {
    this.loginService.userLoggedIsAlunoOrProfessor().then(value => {
      this.isAlunoOrProfessor = value;
      this.isAlunoOrProfessor ? this.findAllByUsername() : this.findAll();
    });
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