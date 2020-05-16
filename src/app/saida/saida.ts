import {Usuario} from '../usuario/usuario';
import {SaidaItem} from './saidaItem';

export class Saida {
  id: number;
  dataSaida: string;
  observacao: string;
  qtde: number;
  usuarioResponsavel: Usuario;
  saidaItem: SaidaItem[];
  idEmprestimo: number;
}
