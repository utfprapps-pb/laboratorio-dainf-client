import {Usuario} from '../usuario/usuario';
import {SolicitacaoCompraItem} from './solicitacaoCompraItem';

export class SolicitacaoCompra {
  id: number;
  descricao: string;
  dataSolicitacao: string;
  usuario: Usuario;
  solicitacaoItem: SolicitacaoCompraItem[];
  observacao: string;
}
