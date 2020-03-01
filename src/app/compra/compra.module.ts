import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CompraService} from './compra.service';
import {CompraFormComponent} from './compra.form.component';
import {CompraListComponent} from './compra.list.component';
import {FormsModule} from '@angular/forms';
import {AutoCompleteModule, InputTextModule, TooltipModule} from 'primeng';
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
    CompraFormComponent,
    CompraListComponent
  ],
  exports: [
    CompraFormComponent,
    CompraListComponent
  ],
  providers: [
    CompraService
  ]
})
export class CompraModule {

}
