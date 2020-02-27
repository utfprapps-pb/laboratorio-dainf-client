import {NgModule} from '@angular/core';
import {UsuarioFormComponent} from './usuario.form.component';
import {UsuarioListComponent} from './usuario.list.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule, MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatTableModule
} from '@angular/material';
import {DropdownModule, InputTextModule, TooltipModule} from 'primeng';
import {UsuarioService} from './usuario.service';

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
    DropdownModule,
    MatDialogModule
  ],
  declarations: [
    UsuarioFormComponent,
    UsuarioListComponent
  ],
  exports: [
    UsuarioFormComponent,
    UsuarioListComponent
  ],
  providers: [
    UsuarioService
  ]
})
export class UsuarioModule {

}
