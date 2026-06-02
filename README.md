# 💻 Laboratório DAINF - Frontend

Este repositório contém a aplicação cliente (frontend) para o sistema de gerenciamento de laboratórios do Departamento Acadêmico de Informática (DAINF) da UTFPR - Campus Pato Branco.

A aplicação foi desenvolvida com Angular e se comunica com o backend via uma API RESTful.

---

## 🛠️ Tecnologias Utilizadas

- **Angular 15+**
- **TypeScript**
- **Angular Material**
- **RxJS**
- **Serviços HTTP com HttpClient**
- **Rotas com Angular Router**

---

## 🚀 Como Executar o Projeto

### 1. Pré-requisitos

- Node.js 16+
- Angular CLI instalado globalmente:

```bash
npm install -g @angular/cli
```

### 2. Clonar o repositório

```bash
git clone https://github.com/utfprapps-pb/laboratorio-dainf-client.git
cd laboratorio-dainf-client
```

### 3. Instalar dependências

```bash
npm install
```

### 4. Executar o servidor de desenvolvimento

```bash
npm start
```

A aplicação estará disponível em `http://localhost:4200/`.

---

## ⚙️ Configuração de Ambiente

Verifique o arquivo `src/environments/environment.ts` para garantir que a URL da API backend esteja correta:

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080' // URL do backend Spring Boot
};
```

---

## 📁 Estrutura do Projeto

```bash
src/
├── app/
│   ├── components/
│   ├── services/
│   ├── models/
│   ├── pages/
│   └── app.module.ts
├── assets/
├── environments/
│   ├── environment.ts
│   └── environment.prod.ts
└── index.html
```

---

## 🌐 Funcionalidades

- Listagem de itens
- Cadastro e edição de reservas
- Autenticação de usuários
- Interface responsiva
- Comunicação com backend via REST

---

## 📄 Licença

Projeto desenvolvido com fins acadêmicos no âmbito da UTFPR - Campus Pato Branco.  
Licenciado sob os termos da licença MIT.

---

## <img src="https://sistemas2.utfpr.edu.br/assets/favicon.svg" alt="UTFPR Logo" width="20" /> Desenvolvido por alunos e professores da UTFPR-PB.

#### A aplicação faz parte do projeto **Bowser: desenvolvimento de softwares de código aberto para a comunidade**.

 - Professor: Vinicius Pegorini
 - Aluno: Gustavo Henrique Lopes Spachuk Zaffani (TCC - Análise e Desenvolvimento de Sistemas)
