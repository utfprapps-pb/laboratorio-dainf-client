import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {ToolbarModule} from '../toolbar/toolbar.module';
import {DialogModule} from 'primeng/dialog';
import {TooltipModule} from 'primeng/tooltip';
import {HomeService} from './home.service';
import {FormsModule} from '@angular/forms';
import {ValidationModule} from '../framework/validation/validation.module';
import {ValidationService} from '../framework/validation/validation.service';
import {DatePickerModule} from 'primeng/datepicker';
import {StatCardComponent} from '../components/stat-card/stat-card.component';
import {DatePipe} from '@angular/common';
import {PanelModule} from 'primeng/panel';
import {ButtonModule} from 'primeng/button';

@NgModule({
  imports: [
    CommonModule,
    ToolbarModule,
    TooltipModule,
    DialogModule,
    DatePickerModule,
    FormsModule,
    ValidationModule,
    PanelModule,
    ButtonModule
  ],
  declarations: [
    HomeComponent,
    StatCardComponent
  ],
  exports: [
    HomeComponent,
    StatCardComponent
  ],
  providers: [
    HomeService,
    ValidationService,
    DatePipe
  ]
})
export class HomeModule {
}
