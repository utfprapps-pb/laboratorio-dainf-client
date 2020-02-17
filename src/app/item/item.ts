import {Grupo} from '../grupo/grupo';

export class Item {
  id: number;
  nome: string;
  patrimonio: number;
  siorg: number;
  valor: number;
  qtdeMinima: number;
  localizacao: string;
  devolver: boolean;
  saldo: number;
  grupo: Grupo;
}
