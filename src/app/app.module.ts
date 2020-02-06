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
import {UsuarioModule} from "./usuario/usuario.module";
import {FornecedorModule} from "./fornecedor/fornecedor.module";
import {EstadoModule} from "./estado/estado.module";
import {PaisModule} from "./pais/pais.module";
import {CidadeModule} from "./cidade/cidade.module";
import {ItemModule} from "./item/item.module";
import {PageNotFoundModule} from "./pageNotFound/pageNotFound.module";
import {NotAuthorizedModule} from "./notAuthorized/notAuthorized.module";

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
    GrupoModule,
    UsuarioModule,
    FornecedorModule,
    EstadoModule,
    PaisModule,
    CidadeModule,
    ItemModule,
    PageNotFoundModule,
    NotAuthorizedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
