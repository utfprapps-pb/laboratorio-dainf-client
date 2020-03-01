import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AutoCompleteModule, InputTextModule, TooltipModule} from 'primeng';
import {CidadeFormComponent} from './cidade.form.component';
import {CidadeListComponent} from './cidade.list.component';
import {CidadeService} from './cidade.service';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';

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
    CidadeFormComponent,
    CidadeListComponent
  ],
  exports: [
    CidadeFormComponent,
    CidadeListComponent
  ],
  providers: [
    CidadeService
  ]
})
export class CidadeModule {

}
