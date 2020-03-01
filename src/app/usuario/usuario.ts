import {Permissao} from './permissao';

export class Usuario {
  id: number;
  nome: string;
  username: string;
  password: string;
  email: string;
  permissoes: Permissao[];
}
