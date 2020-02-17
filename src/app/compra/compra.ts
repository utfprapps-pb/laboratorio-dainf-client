import {Fornecedor} from '../fornecedor/fornecedor';
import {CompraItem} from './compraItem';

export class Compra {
  id: number;
  dataCompra: number;
  fornecedor: Fornecedor;
  compraItem: CompraItem[];
}
