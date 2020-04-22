import {Permissao} from './permissao';

export class Usuario {
  id: number;
  nome: string;
  documento: string;
  username: string;
  password: string;
  email: string;
  permissoes: Permissao[];
}
