import {ReservaItem} from './reservaItem';
import {Usuario} from '../usuario/usuario';

export class Reserva {
  id: number;
  descricao: string;
  dataReserva: string;
  dataRetirada: string;
  observacao: string;
  usuario: Usuario;
  reservaItem: ReservaItem[];
}
