import {ActivatedRoute, Router} from '@angular/router';
import {CrudService} from '../service/crud.service';
import { Injector, OnInit, Directive } from '@angular/core';
import {MessageService} from 'primeng/api';
import {BaseFormComponent} from './base.form.component';
import Swal from 'sweetalert2';
import {LoaderService} from '../loader/loader.service';
import {LoginService} from '../../login/login.service';

@Directive()
export abstract class CrudFormComponent<T, ID> extends BaseFormComponent implements OnInit {

  protected router: Router;
  protected messageService: MessageService;
  protected route: ActivatedRoute;
  protected loaderService: LoaderService;
  protected loginService: LoginService;
  // utilizado para validações extras
  public validExtra = true;
  public editando = false;
  public isAlunosOrProfessor = false;
  public object: T;

  constructor(protected service: CrudService<T, ID>,
              protected injector: Injector,
              protected urlList: string,
              private type?: new () => T) {
    super();
    this.router = this.injector.get(Router);
    this.route = this.injector.get(ActivatedRoute);
    this.messageService = this.injector.get(MessageService);
    this.loaderService = this.injector.get(LoaderService);
    this.loginService = this.injector.get(LoginService);
  }

  ngOnInit(): void {
    this.loginService.userLoggedIsAlunoOrProfessor()
      .then(value => this.isAlunosOrProfessor = value);
    this.newInstance();
    this.preOnInit();
    this.route.params.subscribe(params => {
      if (params.id) {
        if (isNaN(params.id)) {
          this.initializeValues();
        } else {
          this.edit(params.id);
        }
      } else {
        this.initializeValues();
      }
    });
  }

  save() {
    this.loaderService.display(true);
    if (this.isValid() && this.validExtra) {
      this.service.save(this.object)
        .subscribe(e => {
          this.object = e;
          this.postSave(value => {
            this.loaderService.display(false);
            Swal.fire('Sucesso!', 'Registro salvo com sucesso!', 'success');
            this.back();
          });
        }, error => {
          this.loaderService.display(false);
          Swal.fire('Atenção!', 'Ocorreu um erro ao salvar o registro!', 'error');
          console.log(error);
        });
    } else {
      this.loaderService.display(false);
      this.messageService.add({severity: 'info', summary: 'Atenção', detail: 'Necessário preencher todos os campos corretamente!'});
      this.validarFormulario();
    }
  }

  postSave(callback: Function): void {
    callback();
  }

  initializeValues(): void {
  }

  preOnInit(): void {
  }

  postEdit(): void {
  }

  edit(id: ID) {
    this.loaderService.display(true);
    this.service.findOne(id)
      .subscribe(e => {
        this.object = e;
        this.editando = true;
        this.postEdit();
        this.loaderService.display(false);
      }, error => {
        this.loaderService.display(false);
        Swal.fire('Atenção!', 'Ocorreu um erro ao buscar o registro!', 'error');
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
