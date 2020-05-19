import {Component, Injector, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {CrudFormComponent} from '../framework/component/crud.form.component';
import {Item} from './item';
import {ItemService} from './item.service';
import {Grupo} from '../grupo/grupo';
import {GrupoService} from '../grupo/grupo.service';
import {FileUpload, SelectItem} from 'primeng';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-form-item',
  templateUrl: './item.form.component.html',
  styleUrls: ['./item.form.component.css']
})
export class ItemFormComponent extends CrudFormComponent<Item, number> {

  // tslint:disable-next-line:ban-types
  callback: Function;
  grupoList: Grupo[];
  yesNoDropdown: SelectItem[];
  @ViewChild('fileUpload') fileUpload: FileUpload;
  @ViewChild('form', {static: true}) form: NgForm;
  uploadedFiles: any[] = [];
  responsiveOptions;
  images: any[];
  dialogImagens = false;

  constructor(protected itemService: ItemService,
              protected injector: Injector,
              private grupoService: GrupoService) {
    super(itemService, injector, '/item');

    this.yesNoDropdown = [
      {label: 'Sim', value: true},
      {label: 'Não', value: false}
    ];

    this.responsiveOptions = [
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  initializeValues(): void {
    this.object.devolver = this.yesNoDropdown[0].value;
  }

  postEdit(): void {
    if (window.location.href.includes('copy')) {
      this.editando = false;
      this.object.id = null;
    }
  }

  findGrupos($event) {
    this.grupoService.complete($event.query)
      .subscribe(e => {
        this.grupoList = e;
      });
  }

  preSave() {
    this.save();
  }

  onUpload($event: any) {
    this.callback();
    console.log('upload ok');
  }

  getUrlUploadImages(): string {
    return `${environment.api_url}item/upload-images?idItem=${this.object.id}`;
  }

  postSave(callback): void {
    this.fileUpload.url = this.getUrlUploadImages();
    this.fileUpload.upload();
    this.callback = callback;
  }

  showDialogImagens() {
    this.dialogImagens = true;
  }
}
