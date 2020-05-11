import {Item} from '../item/item';
import {Reserva} from './reserva';

export class ReservaItem {
  id: number;
  qtde: number;
  item: Item;
  reserva: Reserva;
}
