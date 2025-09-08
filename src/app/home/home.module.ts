import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {ToolbarModule} from '../toolbar/toolbar.module';
import {DialogModule} from 'primeng/dialog';
import {TooltipModule} from 'primeng/tooltip';
import {HomeService} from './home.service';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {ValidationModule} from '../framework/validation/validation.module';
import {ValidationService} from '../framework/validation/validation.service';
import {DatePickerModule} from "primeng/datepicker";

@NgModule({
  imports: [
    CommonModule,
    ToolbarModule,
    TooltipModule,
    DialogModule,
    DatePickerModule,
    MatButtonModule,
    FormsModule,
    ValidationModule
  ],
  declarations: [
    HomeComponent
  ],
  exports: [
    HomeComponent
  ],
  providers: [
    HomeService,
    ValidationService
  ]
})
export class HomeModule {
}
