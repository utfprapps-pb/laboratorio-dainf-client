import {BrowserModule} from '@angular/platform-browser';
import {DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomeModule} from './home/home.module';
import {ToolbarModule} from './toolbar/toolbar.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {SidenavModule} from './sidenav/sidenav.module';
import {GrupoModule} from './grupo/grupo.module';
import {CommonModule, HashLocationStrategy, LocationStrategy, registerLocaleData} from '@angular/common';
import {UsuarioModule} from './usuario/usuario.module';
import {FornecedorModule} from './fornecedor/fornecedor.module';
import {EstadoModule} from './estado/estado.module';
import {PaisModule} from './pais/pais.module';
import {CidadeModule} from './cidade/cidade.module';
import {ItemModule} from './item/item.module';
import {PageNotFoundModule} from './pageNotFound/pageNotFound.module';
import {NotAuthorizedModule} from './notAuthorized/notAuthorized.module';
import {ConfirmationService, ConfirmDialogModule, MessageService, ScrollPanelModule, ToastModule} from 'primeng';
import {CompraModule} from './compra/compra.module';
import {LoginService} from './login/login.service';
import {HttpClientInterceptor} from './http-client.interceptor';
import {LoginModule} from './login/login.module';
import {EmprestimoModule} from './emprestimo/emprestimo.module';
import {SaidaModule} from './saida/saida.module';
import ptBr from '@angular/common/locales/pt';
import {MatPaginatorIntl} from '@angular/material/paginator';
import {getDutchPaginatorIntl} from './framework/util/dutch-paginator';
import {CURRENCY_MASK_CONFIG} from 'ng2-currency-mask';
import {CustomCurrencyMaskConfig} from './framework/util/currency.mask.config';
import {ReservaModule} from './reserva/reserva.module';
import {SolicitacaoCompraModule} from './solicitacaoCompra/solicitacaoCompra.module';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HomeModule,
    ToolbarModule,
    HttpClientModule,
    ToastModule,
    SidenavModule,
    GrupoModule,
    UsuarioModule,
    FornecedorModule,
    EstadoModule,
    PaisModule,
    CidadeModule,
    ItemModule,
    CompraModule,
    PageNotFoundModule,
    NotAuthorizedModule,
    LoginModule,
    EmprestimoModule,
    ConfirmDialogModule,
    SaidaModule,
    ScrollPanelModule,
    ReservaModule,
    SolicitacaoCompraModule
  ],
  providers: [
    MessageService,
    LoginService,
    ConfirmationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpClientInterceptor,
      multi: true
    },
    {
      provide: LOCALE_ID,
      useValue: 'pt'
    },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL'
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: MatPaginatorIntl,
      useValue: getDutchPaginatorIntl()
    },
    {
      provide: CURRENCY_MASK_CONFIG,
      useValue: CustomCurrencyMaskConfig,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
