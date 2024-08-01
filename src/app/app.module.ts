import { BrowserModule } from "@angular/platform-browser";
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HomeModule } from "./home/home.module";
import { ToolbarModule } from "./toolbar/toolbar.module";
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { SidenavModule } from "./sidenav/sidenav.module";
import { GrupoModule } from "./grupo/grupo.module";
import {
  CommonModule,
  HashLocationStrategy,
  LocationStrategy,
  registerLocaleData,
} from "@angular/common";
import { UsuarioModule } from "./usuario/usuario.module";
import { FornecedorModule } from "./fornecedor/fornecedor.module";
import { EstadoModule } from "./estado/estado.module";
import { PaisModule } from "./pais/pais.module";
import { CidadeModule } from "./cidade/cidade.module";
import { ItemModule } from "./item/item.module";
import { PageNotFoundModule } from "./pageNotFound/pageNotFound.module";
import { NotAuthorizedModule } from "./notAuthorized/notAuthorized.module";
import { ConfirmationService } from "primeng/api";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { MessageService } from "primeng/api";
import { ScrollPanelModule } from "primeng/scrollpanel";
import { ToastModule } from "primeng/toast";
import { CompraModule } from "./compra/compra.module";
import { LoginService } from "./login/login.service";
import { HttpClientInterceptor } from "./http-client.interceptor";
import { LoginModule } from "./login/login.module";
import { EmprestimoModule } from "./emprestimo/emprestimo.module";
import { SaidaModule } from "./saida/saida.module";
import ptBr from "@angular/common/locales/pt";
import { MatPaginatorIntl } from "@angular/material/paginator";
import { getDutchPaginatorIntl } from "./framework/util/dutch-paginator";
import { CURRENCY_MASK_CONFIG } from "ng2-currency-mask";
import { CustomCurrencyMaskConfig } from "./framework/util/currency.mask.config";
import { ReservaModule } from "./reserva/reserva.module";
import { SolicitacaoCompraModule } from "./solicitacaoCompra/solicitacaoCompra.module";
import { LoaderService } from "./framework/loader/loader.service";
import { LoaderModule } from "./framework/loader/loader.module";
import { RelatorioModule } from "./relatorio/relatorio.module";
import { SocialLoginModule } from "@abacritt/angularx-social-login";
import {
  GoogleLoginProvider,
  SocialAuthServiceConfig,
} from "@abacritt/angularx-social-login";
import { CadastrarUsuarioModule } from "./cadastrarUsuario/cadastrarUsuario.module";

registerLocaleData(ptBr);

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HomeModule,
    ToolbarModule,
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
    SolicitacaoCompraModule,
    LoaderModule,
    RelatorioModule,
    SocialLoginModule,
    CadastrarUsuarioModule,
  ],
  providers: [
    MessageService,
    LoginService,
    ConfirmationService,
    LoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpClientInterceptor,
      multi: true,
    },
    {
      provide: LOCALE_ID,
      useValue: "pt",
    },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: "BRL",
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    {
      provide: MatPaginatorIntl,
      useValue: getDutchPaginatorIntl(),
    },
    {
      provide: CURRENCY_MASK_CONFIG,
      useValue: CustomCurrencyMaskConfig,
    },
    {
      provide: "SocialAuthServiceConfig",
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              "80739592554-lgpadsbj9gjql2ssdq414fu58takgfdl.apps.googleusercontent.com"
            ),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class AppModule {}
