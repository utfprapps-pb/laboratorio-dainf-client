import {Component, Injector, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {CrudFormComponent} from '../framework/component/crud.form.component';
import {Item} from './item';
import {ItemService} from './item.service';
import {Grupo} from '../grupo/grupo';
import {GrupoService} from '../grupo/grupo.service';
import {FileUpload} from 'primeng/fileupload';
import {SelectItem} from 'primeng/api';
import {environment} from '../../environments/environment';
import Swal from 'sweetalert2';
import {ItemImage} from './itemImage';

@Component({
  selector: 'app-form-item',
  templateUrl: './item.form.component.html',
  styleUrls: ['./item.form.component.css']
})
export class ItemFormComponent extends CrudFormComponent<Item, number> {

  @ViewChild('fileUpload') fileUpload: FileUpload;
  @ViewChild('form', {static: true}) form: NgForm;
  uploadedFiles: any[] = [];
  responsiveOptions;
  images: ItemImage[];
  dialogImagens = false;
  callback: Function;
  grupoList: Grupo[];
  tipoItem: SelectItem[];
  minioUrl: String;

  constructor(protected itemService: ItemService,
              protected injector: Injector,
              private grupoService: GrupoService) {
    super(itemService, injector, '/item');
    this.minioUrl = environment.minio_url;
    this.tipoItem = [
      {label: 'Consumo', value: 'C'},
      {label: 'Permanente', value: 'P'}
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
    this.object.tipoItem = this.tipoItem[0].value;
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

  onUpload($event: any) {
    this.callback();
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
    this.loaderService.display(true);
    this.itemService.findAllImagesItem(this.object.id)
      .subscribe(e => {
        this.loaderService.display(false);
        if (e.length > 0) {
          this.images = e;
          this.dialogImagens = true;
        } else {
          Swal.fire('Ops...', 'Esse item não possui imagens.', 'info');
        }
      }, error => {
        this.loaderService.display(false);
      });
  }

  deleteImage(image: ItemImage) {
    Swal.fire({
      title: `Tem certeza que deseja remover a imagem?`,
      text: 'A ação não poderá ser desfeita.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.value) {
        this.loaderService.display(true);
        this.itemService.deleteImage(image, this.object.id)
          .subscribe(e => {
            this.deleteImageInObject(image);
            this.loaderService.display(false);
            this.dialogImagens = false;
            Swal.fire('Sucesso!', 'Imagem removida com sucesso!', 'success');
          }, error => {
            this.loaderService.display(false);
            Swal.fire('Atenção!', 'Ocorreu um erro ao remover a imagem', 'error');
          });
      }
    });
  }

  deleteImageInObject(image: ItemImage) {
    let index;
    this.object?.imageItem.forEach(imagem => {
      if (image.id === image.id) {
        index = this.object.imageItem.indexOf(imagem);
      }
    });
    this.object.imageItem.splice(index, 1);
  }

  setSaldoDefaultItem() {
    if (this.object.patrimonio !== null
          && this.object.patrimonio !== undefined
          || this.object?.tipoItem === 'P') {
      this.object.saldo = 1;
      this.object.qtdeMinima = 1;
    } else {
      this.object.saldo = null;
      this.object.qtdeMinima = null;
    }
  }
}
