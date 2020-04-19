import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GrupoListComponent} from './grupo.list.component';
import {GrupoFormComponent} from './grupo.form.component';
import {GrupoService} from './grupo.service';
import {DialogModule, InputTextModule, TooltipModule} from 'primeng';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {ValidationModule} from '../validation/validation.module';
import {ValidationService} from '../validation/validation.service';
import {VoltarModule} from '../geral/voltar/voltar.module';
import {CancelarModule} from '../geral/cancelar/cancelar.module';
import {SalvarModule} from '../geral/salvar/salvar.module';
import {NovoModule} from '../geral/novo/novo.module';

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
        ValidationModule,
        VoltarModule,
        CancelarModule,
        SalvarModule,
        NovoModule,
        DialogModule
    ],
  declarations: [
    GrupoListComponent,
    GrupoFormComponent
  ],
  exports: [
    GrupoListComponent,
    GrupoFormComponent
  ],
  providers: [
    GrupoService,
    ValidationService
  ]
})
export class GrupoModule {

}
