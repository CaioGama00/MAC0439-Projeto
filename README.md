# Projeto MAC0439

O projeto é um jogo de adedonha (Stop) online desenvolvido com **React** no frontend e **Node.js, Express, PostgreSQL, MongoDB e Neo4j** no backend.

## Tecnologias Utilizadas

- **Frontend:** React 
- **Backend:** Node.js, Express
- **Bancos de Dados:** PostgreSQL, MongoDB, Neo4j
- **Autenticação:** JWT (JSON Web Token)

## Estrutura do Projeto

O projeto está dividido em duas pastas principais:

```
MAC0439-Projeto/
│-- frontend/   # Interface do usuário (React)
│-- backend/    # Lógica do servidor e APIs (Node.js, Express)
```

Cada uma dessas pastas contém seu próprio `README.md` com detalhes específicos sobre a instalação e configuração.

## Pré-requisitos

Antes de iniciar o projeto, certifique-se de ter instalado:

- **Node.js** (versão 16 ou superior)
- **npm** ou **yarn**
- **PostgreSQL** (banco de dados relacional)
- **MongoDB** (banco de dados NoSQL)
- **Neo4j** (banco de dados com grafos)

## Instalação e Execução

### Clonando o Repositório

```bash
git clone https://github.com/CaioGama00/MAC0439-Projeto.git
cd MAC0439-Projeto
```

### Configurando o Backend

1. Acesse a pasta do backend:
   ```bash
   cd backend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure o arquivo `.env` conforme instruções no `README.md` do backend.
4. Inicie o servidor:
   ```bash
   node src/server.js
   ```

### Configurando o Frontend

1. Volte para a raiz do projeto e acesse a pasta do frontend:
   ```bash
   cd ../frontend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure o arquivo `.env` conforme instruções no `README.md` do frontend.
4. Inicie o frontend:
   ```bash
   npm start
   ```

O frontend estará disponível em `http://localhost:3000` e o backend em `http://localhost:5000`.

## Licença

Este projeto está sob a licença MIT.
