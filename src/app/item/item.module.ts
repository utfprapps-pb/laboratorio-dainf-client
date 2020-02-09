import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
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
import {ItemFormComponent} from './item.form.component';
import {ItemListComponent} from './item.list.component';
import {ItemService} from './item.service';

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
