import {Injectable} from "@angular/core";
import {CrudService} from "../util/service/crud.service";
import {Estado} from "./estado";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable()
export class EstadoService extends CrudService<Estado, number>{

  constructor(http: HttpClient) {
    super(`${environment.api_url}estado/`, http);
  }
}
