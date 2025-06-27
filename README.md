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

### Clonando o Repositório

```bash
git clone https://github.com/CaioGama00/MAC0439-Projeto.git
cd MAC0439-Projeto
```

## Instalação e Execução


# Requisitos e Configuração do Projeto

Para rodar o projeto, é necessário ter instalações funcionais de **MongoDB**, **PostgreSQL** e **Neo4J** no seu sistema.

## Instalações

- [Instalar Neo4j (Linux)](https://neo4j.com/docs/operations-manual/current/installation/linux/)
- [Instalar PostgreSQL](https://www.postgresql.org/download/)
- [Instalar MongoDB](https://www.mongodb.com/docs/manual/administration/install-on-linux/)

---

## Configuração do `.env`

### PostgreSQL

É necessário saber:

- Porta em que o Postgres está rodando
- Usuário e senha
- Nome do banco de dados

Exemplo de configuração:

```env
# PostgreSQL
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=myuser
POSTGRES_PASSWORD=mypassword
POSTGRES_DB=mac0439db
```

### MongoDB

Apenas a URI e o nome do banco:

```env
# MongoDB
MONGO_URI=mongodb://localhost:27017
MONGO_DB=mongodb
```

### Neo4j

São necessários a URI, o usuário e a senha:

```env
# Neo4J
NEO4J_URI=bolt://127.0.0.1:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=mypassword
```

### JWT (Token)

```env
# JWT
JWT_SECRET=8d8647032f23bd6bb1c6c5ba89b482aba2acc654bb94
JWT_EXPIRES_IN=7d
```

---

## Dicas de Sistema

### Iniciar serviços no Debian

```bash
sudo systemctl start <sistema_gerenciador>
```

Por exemplo:

```bash
sudo systemctl start postgresql
```

### Verificar portas ativas

```bash
sudo ss -ltnp
```

> Os exemplos acima usam as portas padrão dos respectivos sistemas.

---

## Configurando os Bancos de Dados

Os scripts de inicialização estão localizados em:

```
<raiz_do_projeto>/backend/src/scripts
```

Para rodá-los, execute os seguintes comandos para cada banco:

### PostgreSQL

```bash
psql -U <POSTGRES_USER> -d <POSTGRES_DB> -f ./backend/src/scripts/init_postgres.sql
```

### MongoDB

```bash
mongosh <MONGO_DB> < ./backend/src/scripts/init_mongo.js
```

### Neo4J

```bash
cat init_neo4j.cypher | cypher-shell -u <NEO4J_USER> -p <NEO4J_PASSWORD>
```

---

## Instalando Dependências

### Backend

No diretório:

```
<RAIZ_PROJETO>/backend
```

Execute:

```bash
npm install
# ou
yarn install
```

Para iniciar o backend:

```bash
node src/server.js
```

### Frontend

Depois vá para o diretório do frontend:

```bash
cd ../frontend
```

Execute:

```bash
npm install
npm start
```

---

## Endpoints Locais

- Backend: [http://localhost:8000](http://localhost:8000)
- Frontend: [http://localhost:3000](http://localhost:3000)

---

## Licença

Este projeto está sob a licença MIT.
