import {Cidade} from '../cidade/cidade';
import {Estado} from '../estado/estado';

export class Fornecedor {
  id: number;
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  ie: string;
  endereco: string;
  observacao: string;
  telefone: string;
  email: string;
  cidade: Cidade;
  estado: Estado;
}
