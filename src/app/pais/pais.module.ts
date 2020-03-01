import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaisFormComponent} from './pais.form.component';
import {PaisListComponent} from './pais.list.component';
import {FormsModule} from '@angular/forms';
import {InputTextModule, TooltipModule} from 'primeng';
import {PaisService} from './pais.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
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
