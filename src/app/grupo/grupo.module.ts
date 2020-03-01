import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GrupoListComponent} from './grupo.list.component';
import {GrupoFormComponent} from './grupo.form.component';
import {GrupoService} from './grupo.service';
import {InputTextModule, TooltipModule} from 'primeng';
import {FormsModule} from '@angular/forms';
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
  ],
  declarations: [
    GrupoListComponent,
    GrupoFormComponent
  ],
  exports: [
    GrupoListComponent,
    GrupoFormComponent
  ],
  providers: [
    GrupoService
  ]
})
export class GrupoModule {

}
