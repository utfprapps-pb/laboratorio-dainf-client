import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GrupoListComponent} from './grupo.list.component';
import {GrupoFormComponent} from './grupo.form.component';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatTableModule
} from '@angular/material';
import {GrupoService} from './grupo.service';
import {InputTextModule, TooltipModule} from 'primeng';
import {FormsModule} from '@angular/forms';

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
