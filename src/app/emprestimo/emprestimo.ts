import {Usuario} from '../usuario/usuario';
import {EmprestimoItem} from './emprestimoItem';
import {EmprestimoDevolucaoItem} from './emprestimoDevolucaoItem';

export class Emprestimo {
  id: number;
  dataEmprestimo: string;
  prazoDevolucao: string;
  dataDevolucao: string;
  usuarioResponsavel: Usuario;
  usuarioEmprestimo: Usuario;
  emprestimoItem: EmprestimoItem[];
  emprestimoDevolucaoItem: EmprestimoDevolucaoItem[];
  observacao: string;
}
