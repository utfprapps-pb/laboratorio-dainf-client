import {CrudService} from "../framework/service/crud.service";
import {Item} from "./item";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable()
export class ItemService extends CrudService<Item, number>{

  constructor(http: HttpClient) {
    super(`${environment.api_url}item/`, http);
  }
}
