import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
    AutoCompleteModule,
    CarouselModule,
    DialogModule,
    DropdownModule,
    FileUploadModule,
    InputTextareaModule,
    InputTextModule,
    TooltipModule
} from 'primeng';
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
import {ValidationService} from '../framework/validation/validation.service';
import {ValidationModule} from '../framework/validation/validation.module';
import {VoltarModule} from '../geral/voltar/voltar.module';
import {CancelarModule} from '../geral/cancelar/cancelar.module';
import {SalvarModule} from '../geral/salvar/salvar.module';
import {NovoModule} from '../geral/novo/novo.module';
import {GrupoModule} from '../grupo/grupo.module';
import {CadastroRapidoModule} from '../geral/cadastroRapido/cadastroRapido.module';
import {CurrencyMaskModule} from 'ng2-currency-mask';
import {OnlyNumberModule} from '../framework/directives/onlyNumber/onlyNumber.module';
import {MatSortModule} from '@angular/material/sort';
import {BottomSheetItemModule} from './bottomScheetItem/bottomSheetItem.module';

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
        MatSortModule,
        InputTextModule,
        TooltipModule,
        AutoCompleteModule,
        DropdownModule,
        ValidationModule,
        VoltarModule,
        CancelarModule,
        SalvarModule,
        NovoModule,
        DialogModule,
        GrupoModule,
        CadastroRapidoModule,
        CurrencyMaskModule,
        OnlyNumberModule,
        BottomSheetItemModule,
        FileUploadModule,
        CarouselModule,
        InputTextareaModule
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
    ItemService,
    ValidationService
  ]
})
export class ItemModule {

}
