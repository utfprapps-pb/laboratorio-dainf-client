import {Grupo} from '../grupo/grupo';
import {ItemImage} from './itemImage';

export class Item {
  id: number;
  nome: string;
  patrimonio: number;
  siorg: number;
  valor: number;
  qtdeMinima: number;
  localizacao: string;
  tipoItem: string;
  saldo: number;
  grupo: Grupo;
  imageItem: ItemImage[];
}
