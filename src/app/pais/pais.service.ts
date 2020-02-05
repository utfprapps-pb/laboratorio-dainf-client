import {Injectable} from "@angular/core";
import {CrudService} from "../util/service/crud.service";
import {Pais} from "./pais";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable()
export class PaisService extends CrudService<Pais, number>{

  constructor(http: HttpClient) {
    super(`${environment.api_url}pais/`, http);
  }
}
