import {ActivatedRoute, Router} from '@angular/router';
import {CrudService} from '../service/crud.service';
import {Injector, OnInit} from '@angular/core';
import {MessageService} from 'primeng';
import {BaseFormComponent} from './base.form.component';

export abstract class CrudFormComponent<T, ID> extends BaseFormComponent implements OnInit {

  protected router: Router;
  protected messageService: MessageService;
  protected route: ActivatedRoute;
  // utilizado para validações extras
  validExtra = true;
  editando = false;
  object: T;

  constructor(protected service: CrudService<T, ID>,
              protected injector: Injector,
              protected urlList: string,
              private type?: new () => T) {
    super();
    this.router = this.injector.get(Router);
    this.route = this.injector.get(ActivatedRoute);
    this.messageService = this.injector.get(MessageService);
  }

  ngOnInit(): void {
    this.newInstance();
    this.preOnInit();
    this.route.params.subscribe(params => {
      if (params.id) {
        this.edit(params.id);
      } else {
        this.initializeValues();
      }
    });
  }

  save() {
    console.log(this.object);
    if (this.isValid() && this.validExtra) {
      this.service.save(this.object)
        .subscribe(e => {
          this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Registro salvo com sucesso!'});
          this.object = e;
          this.back();
        }, error => {
          this.messageService.add({severity: 'error', summary: 'Atenção', detail: 'Ocorreu um erro ao salvar o registro!'});
          console.log(error);
        });
    } else {
      this.messageService.add({severity: 'info', summary: 'Atenção', detail: 'Necessário preencher todos os campos corretamente!'});
      this.validarFormulario();
    }
  }

  initializeValues(): void {}

  preOnInit(): void {}

  edit(id: ID) {
    this.service.findOne(id)
      .subscribe(e => {
        this.object = e;
        this.editando = true;
      });
  }

  back() {
    this.router.navigate([this.urlList]);
  }

  protected newInstance(): void {
    if (this.type) {
      this.object = new this.type();
    } else {
      this.object = {} as T;
    }
  }

}
