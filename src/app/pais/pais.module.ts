import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaisFormComponent} from './pais.form.component';
import {PaisListComponent} from './pais.list.component';
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
import {InputTextModule, TooltipModule} from 'primeng';
import {PaisService} from './pais.service';

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
    TooltipModule
  ],
  declarations: [
    PaisFormComponent,
    PaisListComponent
  ],
  exports: [
    PaisFormComponent,
    PaisListComponent
  ],
  providers: [
    PaisService
  ]
})
export class PaisModule {
}
