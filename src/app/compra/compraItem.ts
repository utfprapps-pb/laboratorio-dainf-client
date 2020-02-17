import {Item} from '../item/item';
import {Compra} from './compra';

export class CompraItem {
  id: number;
  qtde: number;
  valor: number;
  item: Item;
  compra: Compra;
}
