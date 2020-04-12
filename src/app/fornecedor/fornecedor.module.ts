import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AutoCompleteModule, InputTextModule, TooltipModule} from 'primeng';
import {FornecedorFormComponent} from './fornecedor.form.component';
import {FornecedorListComponent} from './fornecedor.list.component';
import {FornecedorService} from './fornecedor.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {ValidationService} from '../validation/validation.service';
import {ValidationModule} from '../validation/validation.module';
import {NovoModule} from '../geral/novo/novo.module';
import {CancelarModule} from '../geral/cancelar/cancelar.module';
import {SalvarModule} from '../geral/salvar/salvar.module';
import {VoltarModule} from '../geral/voltar/voltar.module';

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
    ValidationModule,
    NovoModule,
    CancelarModule,
    SalvarModule,
    VoltarModule
  ],
  declarations: [
    FornecedorFormComponent,
    FornecedorListComponent
  ],
  exports: [
    FornecedorFormComponent,
    FornecedorListComponent
  ],
  providers: [
    FornecedorService,
    ValidationService
  ]
})
export class FornecedorModule {

}
