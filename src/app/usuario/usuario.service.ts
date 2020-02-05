import {CrudService} from "../util/service/crud.service";
import {Usuario} from "./usuario";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable()
export class UsuarioService extends CrudService<Usuario, number>{

  constructor(http: HttpClient) {
    super(`${environment.api_url}usuario/`, http);
  }
}
