import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomeModule} from './home/home.module';
import {ToolbarModule} from './toolbar/toolbar.module';
import {HttpClientModule} from '@angular/common/http';
import {SidenavModule} from './sidenav/sidenav.module';
import {GrupoModule} from "./grupo/grupo.module";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HomeModule,
    ToolbarModule,
    HttpClientModule,
    SidenavModule,
    GrupoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
