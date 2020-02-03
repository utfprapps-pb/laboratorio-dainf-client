import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {ToolbarModule} from '../toolbar/toolbar.module';

@NgModule({
  imports: [
    CommonModule,
    ToolbarModule
  ],
  declarations: [
    HomeComponent
  ],
  exports: [
    HomeComponent
  ],
  providers: []
})
export class HomeModule {
}
