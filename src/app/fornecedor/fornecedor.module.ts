import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {InputMaskModule} from 'primeng/inputmask';
import {InputTextModule} from 'primeng/inputtext';
import {TooltipModule} from 'primeng/tooltip';
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
import {ValidationService} from '../framework/validation/validation.service';
import {ValidationModule} from '../framework/validation/validation.module';
import {NovoModule} from '../geral/novo/novo.module';
import {CancelarModule} from '../geral/cancelar/cancelar.module';
import {SalvarModule} from '../geral/salvar/salvar.module';
import {VoltarModule} from '../geral/voltar/voltar.module';
import {OnlyNumberModule} from '../framework/directives/onlyNumber/onlyNumber.module';
import {MatSortModule} from '@angular/material/sort';
import {CnpjModule} from '../framework/directives/cnpj/cnpj.module';
import {CnpjValidatorModule} from '../framework/validator/cnpj/cnpj.validator.module';
import {CpfCnpjPipeModule} from '../framework/pipe/cpfCnpj/cpfCnpj.pipe.module';
import {EmailValidatorModule} from '../framework/validator/email/email.validator.module';
import {TelefoneFormatModule} from '../framework/directives/telefone/telefone.format.module';

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
    AutoCompleteModule,
    ValidationModule,
    NovoModule,
    CancelarModule,
    SalvarModule,
    VoltarModule,
    OnlyNumberModule,
    InputMaskModule,
    CnpjModule,
    CnpjValidatorModule,
    CpfCnpjPipeModule,
    EmailValidatorModule,
    TelefoneFormatModule
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
