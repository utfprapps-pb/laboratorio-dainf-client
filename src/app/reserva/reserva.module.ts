import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReservaFormComponent} from './reserva.form.component';
import {ReservaListComponent} from './reserva.list.component';
import {MatCardModule} from '@angular/material/card';
import {NovoModule} from '../geral/novo/novo.module';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {ReservaService} from './reserva.service';
import {MatPaginatorModule} from '@angular/material/paginator';
import {VoltarModule} from '../geral/voltar/voltar.module';
import {FormsModule} from '@angular/forms';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {CalendarModule} from 'primeng/calendar';
import {InputTextModule} from 'primeng/inputtext';
import {CadastroRapidoModule} from '../geral/cadastroRapido/cadastroRapido.module';
import {MatIconModule} from '@angular/material/icon';
import {CancelarModule} from '../geral/cancelar/cancelar.module';
import {SalvarModule} from '../geral/salvar/salvar.module';
import {ValidationModule} from '../framework/validation/validation.module';
import {ValidationService} from '../framework/validation/validation.service';
import {MatSortModule} from '@angular/material/sort';
import {BottomSheetReservaModule} from './bottomScheetReserva/bottomSheetReserva.module';
import { DialogModule } from 'primeng/dialog';
import { CarouselModule } from 'primeng/carousel';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    NovoModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    VoltarModule,
    CalendarModule,
    CadastroRapidoModule,
    AutoCompleteModule,
    MatIconModule,
    CancelarModule,
    SalvarModule,
    InputTextModule,
    ValidationModule,
    BottomSheetReservaModule,
    DialogModule,
    CarouselModule
  ],
  declarations: [
    ReservaFormComponent,
    ReservaListComponent
  ],
  exports: [
    ReservaFormComponent,
    ReservaListComponent
  ],
  providers: [
    ReservaService,
    ValidationService
  ]
})
export class ReservaModule {

}
