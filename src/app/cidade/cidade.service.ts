import {CrudService} from "../util/service/crud.service";
import {Cidade} from "./cidade";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable()
export class CidadeService extends CrudService<Cidade, number> {

  constructor(http: HttpClient) {
    super(`${environment.api_url}cidade/`, http);
  }
}
