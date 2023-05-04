export class TokenDto {
    token: string;
    username: string;
    email: string;
    nome: string

    constructor(token: string, username: string, email: string, nome: string) {
        this.token = token;
        this.username = username;
        this.email = email;
        this.nome = nome;
    }
}