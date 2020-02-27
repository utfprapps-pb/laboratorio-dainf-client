import {ActivatedRoute, Router} from '@angular/router';
import {CrudService} from '../service/crud.service';
import {Injector, OnInit} from '@angular/core';
import {MessageService} from 'primeng';

export abstract class CrudFormComponent<T, ID> implements OnInit {

  protected router: Router;
  protected messageService: MessageService;
  protected route: ActivatedRoute;
  object: T;

  constructor(protected service: CrudService<T, ID>,
              protected injector: Injector,
              protected urlList: string,
              private type?: new () => T) {
    this.router = this.injector.get(Router);
    this.route = this.injector.get(ActivatedRoute);
    this.messageService = this.injector.get(MessageService);
  }

  ngOnInit(): void {
    this.newInstance();
    this.route.params.subscribe(params => {
      if (params.id) {
        this.edit(params.id);
      }
    });
  }

  save() {
    console.log(this.object);
    this.service.save(this.object)
      .subscribe(e => {
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Registro salvo com sucesso!'});
        this.object = e;
        this.back();
      }, error => {
        this.messageService.add({severity: 'error', summary: 'Atenção', detail: 'Ocorreu um erro ao salvar o registro!'});
        console.log(error);
      });
  }

  edit(id: ID) {
    this.service.findOne(id)
      .subscribe(e => {
        this.object = e;
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
