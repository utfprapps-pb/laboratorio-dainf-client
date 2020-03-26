import {Usuario} from '../usuario/usuario';
import {EmprestimoItem} from './emprestimoItem';

export class Emprestimo {
  id: number;
  dataEmprestimo: string;
  dataDevolucao: string;
  usuarioResponsavel: Usuario;
  usuarioEmprestimo: Usuario;
  emprestimoItem: EmprestimoItem[];
}
