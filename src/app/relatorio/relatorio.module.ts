import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RelatorioFormComponent} from './relatorio.form.component';
import {RelatorioListComponent} from './relatorio.list.component';
import {MatCardModule} from '@angular/material/card';
import {NovoModule} from '../geral/novo/novo.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {RelatorioService} from './relatorio.service';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {VoltarModule} from '../geral/voltar/voltar.module';
import {SalvarModule} from '../geral/salvar/salvar.module';
import {CancelarModule} from '../geral/cancelar/cancelar.module';
import {DropdownModule, FieldsetModule, FileUploadModule, InputTextModule, TooltipModule} from 'primeng';
import {MatIconModule} from '@angular/material/icon';
import {ValidationModule} from '../framework/validation/validation.module';
import {ValidationService} from '../framework/validation/validation.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    NovoModule,
    MatTableModule,
    MatPaginatorModule,
    VoltarModule,
    SalvarModule,
    CancelarModule,
    FileUploadModule,
    DropdownModule,
    MatIconModule,
    ValidationModule,
    InputTextModule,
    TooltipModule,
    FieldsetModule
  ],
  declarations: [
    RelatorioFormComponent,
    RelatorioListComponent
  ],
  exports: [
    RelatorioFormComponent,
    RelatorioListComponent
  ],
  providers: [
    RelatorioService,
    ValidationService
  ]
})
export class RelatorioModule {

}
