import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CompraService} from './compra.service';
import {CompraFormComponent} from './compra.form.component';
import {CompraListComponent} from './compra.list.component';
import {FormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatTableModule
} from '@angular/material';
import {AutoCompleteModule, InputTextModule, TooltipModule} from 'primeng';

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
