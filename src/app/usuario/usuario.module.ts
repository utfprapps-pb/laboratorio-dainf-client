import {NgModule} from '@angular/core';
import {UsuarioFormComponent} from './usuario.form.component';
import {UsuarioListComponent} from './usuario.list.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DialogModule, DropdownModule, InputTextModule, TooltipModule} from 'primeng';
import {UsuarioService} from './usuario.service';
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
    DropdownModule,
    DialogModule
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
