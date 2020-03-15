import {Fornecedor} from '../fornecedor/fornecedor';
import {CompraItem} from './compraItem';

export class Compra {
  id: number;
  dataCompra: string;
  fornecedor: Fornecedor;
  compraItem: CompraItem[];
}
