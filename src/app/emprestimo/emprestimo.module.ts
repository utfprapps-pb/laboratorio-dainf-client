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
    DropdownModule
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
    EmprestimoService
  ]
})
export class EmprestimoModule {

}
