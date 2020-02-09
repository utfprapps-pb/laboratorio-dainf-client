import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EstadoFormComponent} from './estado.form.component';
import {EstadoListComponent} from './estado.list.component';
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
import {EstadoService} from './estado.service';

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
    EstadoFormComponent,
    EstadoListComponent
  ],
  exports: [
    EstadoFormComponent,
    EstadoListComponent
  ],
  providers: [
    EstadoService
  ]
})
export class EstadoModule {

}
