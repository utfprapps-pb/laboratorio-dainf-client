import {ActivatedRoute, Router} from "@angular/router";
import {CrudService} from "../service/crud.service";
import {Injector, OnInit} from "@angular/core";

export abstract class CrudFormComponent<T, ID> implements OnInit {

  protected router: Router;
  protected route: ActivatedRoute;
  object: T;

  constructor(protected service: CrudService<T, ID>,
              protected injector: Injector,
              protected urlList: string) {
    this.router = this.injector.get(Router);
    this.route = this.injector.get(ActivatedRoute);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.edit(params['id']);
      }
    });
  }

  save() {
    this.service.save(this.object)
      .subscribe(e => {
        this.object = e;
        this.back();
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
}
