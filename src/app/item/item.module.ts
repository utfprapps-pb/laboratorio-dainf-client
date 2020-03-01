import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AutoCompleteModule, DropdownModule, InputTextModule, TooltipModule} from 'primeng';
import {ItemFormComponent} from './item.form.component';
import {ItemListComponent} from './item.list.component';
import {ItemService} from './item.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';

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
    AutoCompleteModule,
    DropdownModule
  ],
  declarations: [
    ItemFormComponent,
    ItemListComponent
  ],
  exports: [
    ItemFormComponent,
    ItemListComponent
  ],
  providers: [
    ItemService
  ]
})
export class ItemModule {

}
