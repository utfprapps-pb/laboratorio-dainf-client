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
import {CalendarModule} from 'primeng/calendar';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {FieldsetModule} from 'primeng/fieldset';
import {FileUploadModule} from 'primeng/fileupload';
import {InputTextModule} from 'primeng/inputtext';
import {TooltipModule} from 'primeng/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {ValidationModule} from '../framework/validation/validation.module';
import {ValidationService} from '../framework/validation/validation.service';
import {RelatorioViewerComponent} from './relatorio.viewer.component';
import {MatButtonModule} from '@angular/material/button';
import {OnlyNumberModule} from '../framework/directives/onlyNumber/onlyNumber.module';
import {HelpModule} from '../geral/help/help.module';

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
    MatButtonModule,
    VoltarModule,
    SalvarModule,
    CancelarModule,
    FileUploadModule,
    DropdownModule,
    MatIconModule,
    ValidationModule,
    InputTextModule,
    TooltipModule,
    FieldsetModule,
    DialogModule,
    CalendarModule,
    OnlyNumberModule,
    HelpModule
  ],
  declarations: [
    RelatorioFormComponent,
    RelatorioListComponent,
    RelatorioViewerComponent
  ],
  exports: [
    RelatorioFormComponent,
    RelatorioListComponent,
    RelatorioViewerComponent
  ],
  providers: [
    RelatorioService,
    ValidationService
  ]
})
export class RelatorioModule {

}
