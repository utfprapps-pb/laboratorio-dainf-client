import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SaidaFormComponent} from './saida.form.component';
import {SaidaListComponent} from './saida.list.component';
import {SaidaService} from './saida.service';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputTextModule} from 'primeng/inputtext';
import {TooltipModule} from 'primeng/tooltip';
import {ValidationModule} from '../framework/validation/validation.module';
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
    DropdownModule,
    ValidationModule,
    InputTextareaModule,
    VoltarModule,
    CancelarModule,
    SalvarModule,
    CadastroRapidoModule,
    OnlyNumberModule
  ],
  declarations: [
    SaidaFormComponent,
    SaidaListComponent
  ],
  exports: [
    SaidaFormComponent,
    SaidaListComponent
  ],
  providers: [
    SaidaService
  ]
})
export class SaidaModule {

}
