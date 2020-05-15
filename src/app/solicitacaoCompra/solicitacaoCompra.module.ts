import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {NovoModule} from '../geral/novo/novo.module';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {VoltarModule} from '../geral/voltar/voltar.module';
import {AutoCompleteModule, CalendarModule, InputTextModule} from 'primeng';
import {CadastroRapidoModule} from '../geral/cadastroRapido/cadastroRapido.module';
import {MatIconModule} from '@angular/material/icon';
import {CancelarModule} from '../geral/cancelar/cancelar.module';
import {SalvarModule} from '../geral/salvar/salvar.module';
import {ValidationModule} from '../framework/validation/validation.module';
import {SolicitacaoCompraFormComponent} from './solicitacaoCompra.form.component';
import {SolicitacaoCompraListComponent} from './solicitacaoCompra.list.component';
import {ValidationService} from '../framework/validation/validation.service';
import {SolicitacaoCompraService} from './solicitacaoCompra.service';
import {MatSortModule} from '@angular/material/sort';

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
  ],
  declarations: [
    SolicitacaoCompraFormComponent,
    SolicitacaoCompraListComponent
  ],
  exports: [
    SolicitacaoCompraFormComponent,
    SolicitacaoCompraListComponent
  ],
  providers: [
    SolicitacaoCompraService,
    ValidationService
  ]
})
export class SolicitacaoCompraModule {

}
