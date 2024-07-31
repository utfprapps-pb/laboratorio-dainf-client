import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CompraService} from './compra.service';
import {CompraFormComponent} from './compra.form.component';
import {CompraListComponent} from './compra.list.component';
import {FormsModule} from '@angular/forms';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {CalendarModule} from 'primeng/calendar';
import {InputTextModule} from 'primeng/inputtext';
import {TooltipModule} from 'primeng/tooltip';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {ValidationModule} from '../framework/validation/validation.module';
import {ValidationService} from '../framework/validation/validation.service';
import {NovoModule} from '../geral/novo/novo.module';
import {VoltarModule} from '../geral/voltar/voltar.module';
import {CancelarModule} from '../geral/cancelar/cancelar.module';
import {SalvarModule} from '../geral/salvar/salvar.module';
import {CadastroRapidoModule} from '../geral/cadastroRapido/cadastroRapido.module';
import {OnlyNumberModule} from '../framework/directives/onlyNumber/onlyNumber.module';
import {MatSortModule} from '@angular/material/sort';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatCardModule,
    MatSortModule,
    MatButtonModule,
    InputTextModule,
    TooltipModule,
    AutoCompleteModule,
    CalendarModule,
    ValidationModule,
    NovoModule,
    VoltarModule,
    CancelarModule,
    SalvarModule,
    CadastroRapidoModule,
    OnlyNumberModule
  ],
  declarations: [
    CompraFormComponent,
    CompraListComponent
  ],
  exports: [
    CompraFormComponent,
    CompraListComponent
  ],
  providers: [
    CompraService,
    ValidationService
  ]
})
export class CompraModule {

}
