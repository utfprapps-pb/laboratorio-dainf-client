import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {CrudFormComponent} from '../framework/component/crud.form.component';
import {Relatorio} from './relatorio';
import {RelatorioService} from './relatorio.service';
import {FileUpload, SelectItem} from 'primeng';
import {environment} from '../../environments/environment';
import {RelatorioParams} from './relatorioParams';
import {StringUtils} from '../framework/util/string.utils';

@Component({
  selector: 'app-form-relatorio',
  templateUrl: './relatorio.form.component.html',
  styleUrls: ['./relatorio.form.component.css']
})
export class RelatorioFormComponent extends CrudFormComponent<Relatorio, number>{

  @ViewChild('fileUpload') fileUpload: FileUpload;
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
      this.relatorioParams = new RelatorioParams();
    } else {
      console.log(this.relatorioParams);
      console.log('tem algo em branco');
    }
  }

  postSave(callback: Function) {
    this.fileUpload.url = this.getUrlUploadImages();
    this.fileUpload.upload();
    this.callback = callback;
  }
}
