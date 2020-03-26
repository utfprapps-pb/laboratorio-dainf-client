import {Fornecedor} from '../fornecedor/fornecedor';
import {CompraItem} from './compraItem';
import {Usuario} from '../usuario/usuario';

export class Compra {
  id: number;
  dataCompra: string;
  fornecedor: Fornecedor;
  compraItem: CompraItem[];
  usuario: Usuario;
}
