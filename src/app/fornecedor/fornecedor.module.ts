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
    AutoCompleteModule
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
    FornecedorService
  ]
})
export class FornecedorModule {

}
