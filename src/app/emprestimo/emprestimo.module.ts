import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {AutoCompleteModule, CalendarModule, DropdownModule, InputTextModule, TooltipModule} from 'primeng';
import {EmprestimoFormComponent} from './emprestimo.form.component';
import {EmprestimoListComponent} from './emprestimo.list.component';
import {EmprestimoService} from './emprestimo.service';
import {ValidationModule} from '../validation/validation.module';
import {ValidationService} from '../validation/validation.service';
import {MatSortModule} from '@angular/material/sort';
import {NovoModule} from '../geral/novo/novo.module';
import {VoltarModule} from '../geral/voltar/voltar.module';
import {CancelarModule} from '../geral/cancelar/cancelar.module';
import {SalvarModule} from '../geral/salvar/salvar.module';
import {BottomSheetModule} from '../geral/bottomScheet/bottomSheet.module';
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
        MatSortModule,
        MatButtonModule,
        InputTextModule,
        TooltipModule,
        AutoCompleteModule,
        CalendarModule,
        DropdownModule,
        ValidationModule,
        NovoModule,
        VoltarModule,
        CancelarModule,
        SalvarModule,
        BottomSheetModule,
        CadastroRapidoModule
    ],
  declarations: [
    EmprestimoFormComponent,
    EmprestimoListComponent
  ],
  exports: [
    EmprestimoFormComponent,
    EmprestimoListComponent
  ],
  providers: [
    EmprestimoService,
    ValidationService
  ]
})
export class EmprestimoModule {

}
