import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {ToolbarModule} from '../toolbar/toolbar.module';
import {CalendarModule, DialogModule, TooltipModule} from 'primeng';
import {HomeService} from './home.service';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {ValidationModule} from '../validation/validation.module';
import {ValidationService} from '../validation/validation.service';

@NgModule({
  imports: [
    CommonModule,
    ToolbarModule,
    TooltipModule,
    DialogModule,
    CalendarModule,
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
