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
import {AutoCompleteModule} from 'primeng/autocomplete';
import {CalendarModule} from 'primeng/calendar';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputTextModule} from 'primeng/inputtext';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {TooltipModule} from 'primeng/tooltip';
import {EmprestimoFormComponent} from './emprestimo.form.component';
import {EmprestimoListComponent} from './emprestimo.list.component';
import {EmprestimoService} from './emprestimo.service';
import {ValidationModule} from '../framework/validation/validation.module';
import {ValidationService} from '../framework/validation/validation.service';
import {MatSortModule} from '@angular/material/sort';
import {NovoModule} from '../geral/novo/novo.module';
import {VoltarModule} from '../geral/voltar/voltar.module';
import {CancelarModule} from '../geral/cancelar/cancelar.module';
import {SalvarModule} from '../geral/salvar/salvar.module';
import {BottomSheetModule} from '../geral/bottomScheet/bottomSheet.module';
import {CadastroRapidoModule} from '../geral/cadastroRapido/cadastroRapido.module';
import {OnlyNumberModule} from '../framework/directives/onlyNumber/onlyNumber.module';
import {BottomSheetEmprestimoModule} from './bottomScheetEmprestimo/bottomSheetEmprestimo.module';
import {EmprestimoDevolucaoComponent} from './emprestimo.devolucao.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatMenuModule} from '@angular/material/menu';
import { CardModule } from 'primeng/card';

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
    InputTextareaModule,
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
    BottomSheetEmprestimoModule,
    CadastroRapidoModule,
    OnlyNumberModule,
    DragDropModule,
    ScrollPanelModule,
    DialogModule,
    MatMenuModule,
    CardModule,
  ],
  declarations: [
    EmprestimoFormComponent,
    EmprestimoListComponent,
    EmprestimoDevolucaoComponent
  ],
  exports: [
    EmprestimoFormComponent,
    EmprestimoListComponent,
    EmprestimoDevolucaoComponent
  ],
  providers: [
    EmprestimoService,
    ValidationService
  ]
})
export class EmprestimoModule {

}
