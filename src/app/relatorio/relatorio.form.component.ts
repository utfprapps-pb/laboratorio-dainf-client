import {Component, ElementRef, Injector, ViewChild} from '@angular/core';
import {CrudFormComponent} from '../framework/component/crud.form.component';
import {Relatorio} from './relatorio';
import {RelatorioService} from './relatorio.service';
import {FileUpload, SelectItem} from 'primeng';
import {environment} from '../../environments/environment';
import {RelatorioParams} from './relatorioParams';
import {StringUtils} from '../framework/util/string.utils';
import {MatTable} from '@angular/material/table';

@Component({
  selector: 'app-form-relatorio',
  templateUrl: './relatorio.form.component.html',
  styleUrls: ['./relatorio.form.component.css']
})
export class RelatorioFormComponent extends CrudFormComponent<Relatorio, number> {

  @ViewChild('table') table: MatTable<any>;
  @ViewChild('fileUpload') fileUpload: FileUpload;
  @ViewChild('nomeParam') nomeParam: ElementRef;
  uploadedFiles: any[] = [];
  callback: Function;
  tipoParamDropdown: SelectItem[];
  relatorioParams: RelatorioParams;
  displayedColumns = ['nameParam', 'aliasParam', 'tipoParam', 'actionsForm'];

  constructor(protected relatorioService: RelatorioService,
              protected injector: Injector) {
    super(relatorioService, injector, '/relatorio');

    this.tipoParamDropdown = [
      {label: 'String', value: 'S'},
      {label: 'Number', value: 'N'},
      {label: 'Date', value: 'D'},
    ];

    this.relatorioParams = new RelatorioParams();
    this.relatorioParams.tipoParam = this.tipoParamDropdown[0].value;
  }

  onUpload($event: any) {
    this.callback();
  }

  getUrlUploadImages(): string {
    return `${environment.api_url}relatorio/upload-file-report?idRelatorio=${this.object.id}`;
  }

  insertParam() {
    if (StringUtils.isNotBlank(this.relatorioParams.tipoParam)
      && StringUtils.isNotBlank(this.relatorioParams.nameParam)
      && StringUtils.isNotBlank(this.relatorioParams.aliasParam)) {

      if (this.object.paramsList == null) {
        this.object.paramsList = new Array();
      }
      this.object.paramsList.push(this.relatorioParams);
      this.postInsertParam();
    } else {
      this.messageService.add({severity: 'info', summary: 'Atenção', detail: 'Necessário preencher todos os campos corretamente!'});
    }
  }

  postInsertParam() {
    this.relatorioParams = new RelatorioParams();
    this.relatorioParams.tipoParam = this.tipoParamDropdown[0].value;
    this.table.renderRows();
    this.nomeParam.nativeElement.focus();
  }

  postSave(callback: Function) {
    this.fileUpload.url = this.getUrlUploadImages();
    this.fileUpload.upload();
    this.callback = callback;
  }

  removeParam(nameParam: string) {
    let index;
    this.object.paramsList.forEach(param => {
      if (param.nameParam === nameParam) {
        index = this.object.paramsList.indexOf(param);
      }
    });
    this.object.paramsList.splice(index, 1);
    this.table.renderRows();
  }

  preSave() {
    if (!this.editando) {
      this.fileUpload.files.length > 0 ? this.validExtra = true : this.validExtra = false;
    } else {
      this.validExtra = true;
    }
    this.save();
  }
}
