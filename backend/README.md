# Backend do Projeto

Este é o backend do projeto, desenvolvido com Node.js, Express, PostgreSQL, MongoDB e Neo4j.

## Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- PostgreSQL (rodando localmente ou em um serviço em nuvem)
- MongoDB (rodando localmente ou em um serviço em nuvem, como MongoDB Atlas)
- Neo4j (rodando localmente ou em um serviço em nuvem)

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/CaioGama00/MAC0439-Projeto.git
   ```

2. Navegue até a pasta do backend:

   ```bash
   cd backend
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```
   ou
   
   ```bash
   yarn install
   ```

## Configuração

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:

```plaintext
# PostgreSQL
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=seu_usuario
POSTGRES_PASSWORD=sua_senha
POSTGRES_DB=nome_db

# MongoDB
MONGO_URI=sua_uri_mongo
MONGO_DB=nome_db

# Neo4j
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=sua_senha

# Autenticação JWT
JWT_SECRET=sua_chave_secreta_jwt
JWT_EXPIRES_IN=1h
```

## Executando o Projeto

Para iniciar o servidor, execute:

```bash
node src/server.js
```

O backend estará disponível em [http://localhost:5000](http://localhost:5000).

## Estrutura do Projeto

- `src/`: Código fonte do backend.
  - `config/`: Configurações do projeto (banco de dados, autenticação, etc.).
  - `models/`: Modelos de dados para PostgreSQL, MongoDB e Neo4j.
  - `controllers/`: Lógica de controle das requisições.
  - `routes/`: Rotas da API.
  - `services/`: Serviços de negócio.
  - `utils/`: Utilitários e funções auxiliares.
- `app.js`: Arquivo principal da aplicação.
- `server.js`: Configuração do servidor.
- `scripts/`: Scripts para inicialização e migração de bancos de dados.
