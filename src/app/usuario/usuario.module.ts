import {NgModule} from '@angular/core';
import {UsuarioFormComponent} from './usuario.form.component';
import {UsuarioListComponent} from './usuario.list.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DialogModule, DropdownModule, InputTextModule, MultiSelectModule, TooltipModule} from 'primeng';
import {UsuarioService} from './usuario.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {ValidationModule} from '../framework/validation/validation.module';
import {ValidationService} from '../framework/validation/validation.service';
import {VoltarModule} from '../geral/voltar/voltar.module';
import {CancelarModule} from '../geral/cancelar/cancelar.module';
import {SalvarModule} from '../geral/salvar/salvar.module';
import {NovoModule} from '../geral/novo/novo.module';
import {MatSortModule} from '@angular/material/sort';
import {EmailValidatorModule} from '../framework/validator/email/email.validator.module';

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
        MatSortModule,
        InputTextModule,
        TooltipModule,
        DropdownModule,
        DialogModule,
        ValidationModule,
        VoltarModule,
        CancelarModule,
        SalvarModule,
        NovoModule,
        MultiSelectModule,
        EmailValidatorModule
    ],
  declarations: [
    UsuarioFormComponent,
    UsuarioListComponent
  ],
  exports: [
    UsuarioFormComponent,
    UsuarioListComponent
  ],
  providers: [
    UsuarioService,
    ValidationService
  ]
})
export class UsuarioModule {

}
