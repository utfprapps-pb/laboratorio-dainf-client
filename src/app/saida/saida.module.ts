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
import {AutoCompleteModule, CalendarModule, DropdownModule, InputTextareaModule, InputTextModule, TooltipModule} from 'primeng';
import {ValidationModule} from '../validation/validation.module';
import {VoltarModule} from '../geral/voltar/voltar.module';
import {CancelarModule} from '../geral/cancelar/cancelar.module';
import {SalvarModule} from '../geral/salvar/salvar.module';
import {CadastroRapidoModule} from '../geral/cadastroRapido/cadastroRapido.module';

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
        CadastroRapidoModule
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
